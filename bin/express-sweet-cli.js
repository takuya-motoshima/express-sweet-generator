#!/usr/bin/env node
const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const readline = require('readline');
const util = require('util');
const version = require('../package').version;

/**
 * Install an around function; AOP.
 */
function around(obj, method, fn) {
  const old = obj[method];
  obj[method] = function() {
    return fn.call(this, old, [...arguments]);
  }
}

/**
 * Install a before function; AOP.
 */
function before(obj, method, fn) {
  const old = obj[method];
  obj[method] = function() {
    fn.call(this);
    old.apply(this, arguments);
  }
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */
function confirm(message, callback) {
  const rl = readline.createInterface({input: process.stdin, output: process.stdout})
  rl.question(message, input => {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input))
  })
}

/**
 * Create application at the given directory.
 */
function createApplication(appName, installDir) {
  // Output blank line.
  console.log();

  // Application listening port.
  const port = program.port;

  // Copy the entire template as a creation application.
  const output = program.output === 'esm' ? 'esm' : 'cjs';
  const templateDir = path.join(__dirname, '..', `templates/${output}`);
  fs.copySync(templateDir, installDir);

  // Copy bin/www.
  compile(path.join(installDir, 'bin/www'), {name: appName});

  // Copy ecosystem.config.js.
  compile(path.join(installDir, 'ecosystem.config.js'), {name: appName, port});

  // Copy nginx.sample.conf.
  compile(path.join(installDir, 'nginx.sample.conf'), {name: appName, port});

  // Copy package.json.
  compile(path.join(installDir, 'package.json'), {name: appName});

  // Copy the front-end module (template/client) to the installation directory.
  const templateClientDir = path.join(__dirname, '../templates/client');
  fs.copySync(templateClientDir, `${installDir.replace(/\/$/, '')}/client`);

  const prompt = launchedFromCmd() ? '>' : '$'
  if (installDir !== '.') {
    // Output blank line.
    console.log();
    console.log('   change directory:');
    console.log(`     ${prompt} cd ${installDir}`);
  }

  // Output blank line.
  console.log();
  console.log('   install dependencies:');
  console.log(`     ${prompt} npm install`);

  // Output blank line.
  console.log();
  console.log('   run the app:');
  if (launchedFromCmd())
    console.log(`     ${prompt} SET DEBUG=${appName}:* & npm start`);
  else
    console.log(`     ${prompt} DEBUG=${appName}:* npm start`);

  // Output blank line.
  console.log();
}

/**
 * Get the application name based on the installation directory.
 */
function getAppName(installDir) {
  return path.basename(installDir)
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase();
}

/**
 * Does the installation directory already exist?
 *
 * @param {String} dir
 * @param {Function} fn
 */
function existsInstallationDirectory(dir, fn) {
  fs.readdir(dir, (err, files) => {
    if (err && err.code !== 'ENOENT')
      throw err;
    fn(!files || !files.length);
  });
}

/**
 * Graceful exit for async STDIO
 */
function exit(code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done() {
    if (!(draining--))
      _exit(code)
  }

  let draining = 0
  const streams = [process.stdout, process.stderr]
  exit.exited = true
  streams.forEach(function(stream) {
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });
  done();
}

/**
 * Determine if launched from cmd.exe
 */
function launchedFromCmd() {
  return process.platform === 'win32' && process.env._ === undefined
}

/**
 * Compile template.
 */
function compile(file, locals) {
  const contents = fs.readFileSync(`${file}.ejs`, 'utf-8');
  const compiled = ejs.render(contents, locals, {escape: util.inspect});
  fs.writeFileSync(file, compiled, {mode: parseInt('0755', 8)})
  console.log(`   \x1b[36mcreate\x1b[0m : ${file}`);
  fs.unlinkSync(`${file}.ejs`);
}

/**
 * Main program.
 */
function main() {
  const installDir = program.args.shift() || '.'
  const appName = getAppName(path.resolve(installDir)) || 'myapp'
  existsInstallationDirectory(installDir, notexists => {
    if (notexists || program.force)
      createApplication(appName, installDir);
    else
      confirm('destination is not empty, continue? [y/N] ', ok => {
        if (ok) {
          process.stdin.destroy()
          createApplication(appName, installDir)
        } else {
          console.error('aborting')
          exit(1)
        }
      })
  })
}

// Re-assign process.exit because of commander

// TODO: Switch to a different command framework
const _exit = process.exit;
process.exit = exit;

// CLI
around(program, 'optionMissingArgument', function(fn, args) {
  program.outputHelp();
  fn.apply(this, args);
  return {args: [], unknown: []};
});

before(program, 'outputHelp', function() {
  // track if help was shown for unknown option
  this._helpShown = true;
});

before(program, 'unknownOption', function() {
  // allow unknown options if help was shown, to prevent trailing error
  this._allowUnknownOption = this._helpShown;

  // show help if not yet shown
  if (!this._helpShown)
    program.outputHelp();
});

program
  .name('express-sweet')
  .version(version, '    --version')
  .usage('[options] [dir]')
  .option('-o, --output <output>', 'add output <module> support (esm|cjs) (defaults to cjs)')
  .option('-p, --port <port>', 'application listening port', value => parseInt(value, 10), 3000)
  .option('-f, --force', 'force on non-empty directory')
  .parse(process.argv);

if (!exit.exited)
  main();