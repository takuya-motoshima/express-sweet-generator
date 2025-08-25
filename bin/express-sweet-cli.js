#!/usr/bin/env node

/**
 * Express Sweet Application Generator CLI
 * 
 * This CLI tool generates Express applications using the Express Sweet framework.
 * It creates a complete application structure with templates for both ESM and CJS modules.
 */

const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');
const { Command } = require('commander');
const readline = require('readline');
const util = require('util');
const version = require('../package').version;

const program = new Command();

/**
 * Install an around function using Aspect-Oriented Programming (AOP).
 * Wraps the original method with a new function that can execute code before and after.
 * 
 * @param {Object} obj - The object containing the method to wrap
 * @param {string} method - The method name to wrap
 * @param {Function} fn - The wrapper function
 */
function around(obj, method, fn) {
  const old = obj[method];
  obj[method] = function() {
    return fn.call(this, old, [...arguments]);
  }
}

/**
 * Install a before function using Aspect-Oriented Programming (AOP).
 * Executes the provided function before calling the original method.
 * 
 * @param {Object} obj - The object containing the method to wrap
 * @param {string} method - The method name to wrap
 * @param {Function} fn - The function to execute before the original method
 */
function before(obj, method, fn) {
  const old = obj[method];
  obj[method] = function() {
    fn.call(this);
    old.apply(this, arguments);
  }
}

/**
 * Prompts the user for confirmation on STDOUT/STDIN.
 * 
 * @param {string} message - The confirmation message to display
 * @param {Function} callback - Callback function that receives a boolean result
 */
function confirm(message, callback) {
  const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
  });
  
  rl.question(message, input => {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

/**
 * Creates an Express Sweet application at the given directory.
 * Copies templates, compiles EJS files, and provides setup instructions.
 * 
 * @param {string} appName - The application name
 * @param {string} installDir - The installation directory path
 */
function createApplication(appName, installDir) {
  console.log();

  const port = program.opts().port;
  const output = program.opts().output === 'esm' ? 'esm' : 'cjs';
  const templateDir = path.join(__dirname, '..', `templates/${output}`);

  // Copy the entire template directory to the installation directory
  fs.copySync(templateDir, installDir);

  // Compile template files with application-specific variables
  compile(path.join(installDir, 'bin/www'), { name: appName });
  compile(path.join(installDir, program.opts().output === 'esm' ? 'ecosystem.config.cjs' : 'ecosystem.config.js'), { name: appName, port });
  compile(path.join(installDir, 'nginx.sample.conf'), { name: appName, port });
  compile(path.join(installDir, 'package.json'), { name: appName, port });

  // Copy the frontend client template
  const templateClientDir = path.join(__dirname, '../templates/client');
  fs.copySync(templateClientDir, `${installDir.replace(/\/$/, '')}/client`);

  // Display setup instructions
  displaySetupInstructions(appName, installDir);
}

/**
 * Displays setup instructions to the user after application creation.
 * 
 * @param {string} appName - The application name
 * @param {string} installDir - The installation directory path
 */
function displaySetupInstructions(appName, installDir) {
  const prompt = launchedFromCmd() ? '>' : '$';

  if (installDir !== '.') {
    console.log();
    console.log('   change directory:');
    console.log(`     ${prompt} cd ${installDir}`);
  }

  console.log();
  console.log('   install dependencies:');
  console.log(`     ${prompt} npm install`);

  console.log();
  console.log('   run the app:');
  if (launchedFromCmd()) {
    console.log(`     ${prompt} SET DEBUG=${appName}:* & npm start`);
  } else {
    console.log(`     ${prompt} DEBUG=${appName}:* npm start`);
  }

  console.log();
}

/**
 * Generates an application name based on the installation directory.
 * Sanitizes the directory name to create a valid package name.
 * 
 * @param {string} installDir - The installation directory path
 * @returns {string} The sanitized application name
 */
function getAppName(installDir) {
  return path.basename(installDir)
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase();
}

/**
 * Checks if the installation directory exists and whether it's empty.
 * 
 * @param {string} dir - The directory path to check
 * @param {Function} fn - Callback function that receives a boolean indicating if the directory is empty
 */
function existsInstallationDirectory(dir, fn) {
  fs.readdir(dir, (error, files) => {
    if (error && error.code !== 'ENOENT') {
      throw error;
    }
    fn(!files || !files.length);
  });
}

/**
 * Graceful exit handler for async STDIO operations.
 * Handles Node.js Windows pipe bug by flushing output streams.
 * 
 * @param {number} code - The exit code
 * @see https://github.com/joyent/node/issues/6247
 * @see https://github.com/visionmedia/mocha/issues/333
 */
function exit(code) {
  function done() {
    if (!(draining--)) {
      _exit(code);
    }
  }

  let draining = 0;
  const streams = [process.stdout, process.stderr];
  
  exit.exited = true;
  
  streams.forEach(function(stream) {
    // Submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });
  
  done();
}

/**
 * Determines if the script was launched from Windows cmd.exe.
 * 
 * @returns {boolean} True if launched from cmd.exe, false otherwise
 */
function launchedFromCmd() {
  return process.platform === 'win32' && process.env._ === undefined;
}

/**
 * Compiles an EJS template file with the provided local variables.
 * Renders the template, writes the output file, and removes the original .ejs file.
 * 
 * @param {string} file - The target file path (without .ejs extension)
 * @param {Object} locals - Local variables to pass to the EJS template
 */
function compile(file, locals) {
  const templateFile = `${file}.ejs`;
  const contents = fs.readFileSync(templateFile, 'utf-8');
  const compiled = ejs.render(contents, locals, { escape: util.inspect });
  
  fs.writeFileSync(file, compiled, { mode: parseInt('0755', 8) });
  console.log(`   \x1b[36mcreate\x1b[0m : ${file}`);
  fs.unlinkSync(templateFile);
}

/**
 * Main program entry point.
 * Processes command line arguments and initiates application creation.
 */
function main() {
  const installDir = program.args[0] || '.';
  const appName = getAppName(path.resolve(installDir)) || 'myapp';
  
  existsInstallationDirectory(installDir, isEmpty => {
    if (isEmpty || program.opts().force) {
      createApplication(appName, installDir);
    } else {
      confirm('destination is not empty, continue? [y/N] ', ok => {
        if (ok) {
          process.stdin.destroy();
          createApplication(appName, installDir);
        } else {
          console.error('aborting');
          exit(1);
        }
      });
    }
  });
}

// Store original process.exit for graceful exit handling
const _exit = process.exit;
process.exit = exit;

// Configure Commander.js with AOP functions for better error handling
around(program, 'optionMissingArgument', function(fn, args) {
  program.outputHelp();
  fn.apply(this, args);
  return { args: [], unknown: [] };
});

before(program, 'outputHelp', function() {
  // Track if help was shown for unknown option
  this._helpShown = true;
});

before(program, 'unknownOption', function() {
  // Allow unknown options if help was shown, to prevent trailing error
  this._allowUnknownOption = this._helpShown;

  // Show help if not yet shown
  if (!this._helpShown) {
    program.outputHelp();
  }
});

// Configure CLI options and commands
program
  .name('express-sweet')
  .version(version)
  .usage('[options] [dir]')
  .option('-o, --output <output>', 'add output <module> support (esm|cjs) (defaults to cjs)')
  .option('-p, --port <port>', 'application listening port', value => parseInt(value, 10), 3000)
  .option('-f, --force', 'force on non-empty directory')
  .argument('[dir]', 'directory to create the app in')
  .parse(process.argv);

// Execute main program if not already exited
if (!exit.exited) {
  main();
}