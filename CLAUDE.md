# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CLI application generator for Express Sweet applications. The generator creates full-stack Express applications with both backend and frontend components, supporting both CommonJS (CJS) and ECMAScript Modules (ESM) output formats.

## Architecture

### Core Generator Structure

- **`bin/express-sweet-cli.js`**: Main CLI entry point that processes command-line arguments and orchestrates application generation
- **`templates/`**: Contains template directories for different module systems:
  - `templates/cjs/`: CommonJS application templates 
  - `templates/esm/`: ESM application templates
  - `templates/client/`: Frontend React/jQuery templates (shared between CJS/ESM)

### Template Processing Pipeline

1. **Directory Selection**: Based on `-o, --output` flag (esm|cjs, defaults to cjs)
2. **File Copying**: Templates are copied from `templates/{output}/` to target directory
3. **EJS Compilation**: Files ending in `.ejs` are processed with application-specific variables:
   - `name`: Application name (sanitized from directory name)
   - `port`: Port number (from `-p, --port` flag, defaults to 3000)
4. **Frontend Integration**: Client templates are copied to `{target}/client/`

### Key Template Variables

When modifying `.ejs` template files, these variables are available:
- `<%- name %>`: Sanitized application name
- `<%- port %>`: Application port number

### Template Architecture

Both CJS and ESM templates follow the same structure:
- **Configuration**: `config/` - Database, authentication, logging, view settings
- **Models**: Sequelize models with express-sweet DatabaseManager integration
- **Routes**: Express routes with API and web endpoints
- **Middleware**: Custom validation and error handling
- **Frontend**: Webpack-based build with shared components and API clients

## Development Commands

### Testing the Generator

```bash
# Test CJS generation
node bin/express-sweet-cli.js test-app-cjs

# Test ESM generation  
node bin/express-sweet-cli.js -o esm test-app-esm

# Test with custom port
node bin/express-sweet-cli.js -p 4000 test-app-port

# Force generation in non-empty directory
node bin/express-sweet-cli.js -f existing-dir
```

### Template Development

When modifying templates:

1. **Edit template files** in `templates/cjs/` or `templates/esm/`
2. **Test generation** with a temporary app name
3. **Verify compilation** of `.ejs` files produces correct output
4. **Test generated app** by running:
   ```bash
   cd test-app
   npm install
   npm start
   ```

### Key Files to Understand

- **`bin/express-sweet-cli.js:87-90`**: EJS compilation process for dynamic files
- **`templates/*/package.json.ejs`**: Template package.json with port configuration
- **`templates/*/config/`**: Configuration files that define application behavior
- **`templates/client/`**: Frontend build system and components

## Template Modification Guidelines

### Adding New Configuration Files

1. Create the file in both `templates/cjs/config/` and `templates/esm/config/`
2. Use appropriate module syntax (`module.exports` vs `export default`)
3. Add comprehensive JSDoc documentation
4. Update README.md structure diagram
5. Add entry to CHANGELOG.md

### Modifying EJS Templates

- Files ending in `.ejs` are processed during generation
- Use `<%- variable %>` for unescaped output
- Use `<%= variable %>` for escaped output  
- Test compilation with different variable combinations

### Dependencies Management

- Update both CJS and ESM template `package.json.ejs` files
- Keep `express-sweet` version in sync with generator requirements
- Update CHANGELOG.md when bumping dependency versions

## Important Notes

- The generator creates applications using express-sweet v3.0.0+ with DatabaseManager pattern
- Generated applications include comprehensive frontend tooling with Webpack and Metronic UI
- Both module systems (CJS/ESM) must be maintained in parallel
- Port configuration flows from CLI to generated package.json start script

## Testing Generated Applications

Generated applications require:
1. MySQL/MariaDB database setup (see README.md for SQL schema)
2. Database configuration in `config/database.js`
3. Node.js dependencies installation (`npm install`)
4. Frontend build setup in `client/` directory