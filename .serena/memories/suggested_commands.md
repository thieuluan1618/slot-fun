# Suggested Commands for Slot-Fun Development

## Development Server
```bash
npm start
# or
ng serve
```
- Starts development server at http://localhost:4200/
- Automatically reloads on file changes
- Uses increased memory allocation (4096MB)

## Build Commands
```bash
# Development build
ng build

# Production build
ng build --prod
```
- Development builds go to `dist/slot-fun/`
- Production builds are optimized with tree-shaking

## Code Quality and Linting
```bash
# Run TSLint
ng lint

# Note: Project has both TSLint (legacy) and ESLint packages
# You may want to run both or migrate to ESLint only
```

## Testing
```bash
# Run unit tests
ng test

# Run unit tests with coverage
ng test --code-coverage

# Run end-to-end tests
ng e2e
```
- Uses Karma + Jasmine for unit testing
- Uses Protractor for e2e testing
- Test files are generated with `.spec.ts` extension

## Code Generation
```bash
# Generate new component
ng generate component component-name

# Generate other schematics
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## Deployment
```bash
# Deploy to Netlify (configured)
ng deploy
```
- Automatically configured for Netlify deployment
- Deploys from `dist/slot-fun/` directory

## Package Management
```bash
# Install dependencies
npm install

# Install new package
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

## Development Utilities
```bash
# Check Angular version
ng version

# Get help
ng help

# Update Angular
ng update

# Add Angular package
ng add package-name
```

## Darwin (macOS) System Commands
Since you're on macOS (Darwin), these system commands are available:

```bash
# File operations
ls -la          # List files with details
find . -name "*.ts"  # Find TypeScript files
grep -r "search-term" src/  # Search in files

# Git operations
git status
git add .
git commit -m "message"
git push origin main

# Process management
ps aux | grep node    # Find Node processes
kill -9 PID          # Force kill process
```

## Project-Specific Notes
- Main branch for deployment: `main`
- Development happens on `develop` branch
- The project uses a mix of legacy TSLint and newer ESLint packages
- Memory allocation is increased for Node.js during development
- No specific formatting command configured - consider adding Prettier