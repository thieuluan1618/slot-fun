# Code Style and Conventions

## Language and Framework Conventions
- **TypeScript**: ES2022 target with modern features enabled
- **Angular**: Version 17.x with standalone components by default
- **Module System**: ES2020 modules with Node.js resolution

## TSLint Configuration (Legacy)
The project uses TSLint with the following key rules:

### Formatting
- **Indentation**: Spaces (not tabs)
- **Max Line Length**: 140 characters
- **Quotes**: Single quotes preferred
- **Semicolons**: Always required
- **End of Line**: Required

### Naming Conventions
- **Components**: PascalCase class names with 'Component' suffix
- **Component Selectors**: kebab-case with 'app-' prefix
- **Directives**: camelCase with 'app-' prefix and 'Directive' suffix
- **Variables**: camelCase, allow PascalCase, ban keywords

### Angular-Specific
- **Component Class Suffix**: Required
- **Directive Class Suffix**: Required
- **Lifecycle Interfaces**: Must implement lifecycle interfaces
- **Template**: Banana-in-box syntax required, no negated async

### Code Organization
- **Member Ordering**: 
  1. Static fields
  2. Instance fields
  3. Static methods
  4. Instance methods
- **Imports**: No 'rxjs/Rx' imports allowed, proper spacing required

## Angular CLI Schematics Configuration
From `angular.json`:
- **Style**: SCSS by default
- **Skip Tests**: true (tests are skipped by default)
- **Standalone**: true (standalone components by default)
- **Prefix**: 'app'

## TypeScript Configuration
- **Experimental Decorators**: Enabled
- **Source Maps**: Enabled in development
- **Strict Injection Parameters**: Enabled
- **Full Template Type Check**: Enabled

## File Structure Conventions
- Components use separate files: `.ts`, `.html`, `.scss`
- Services in dedicated `services/` directory
- Models in dedicated `models/` directory
- Shared utilities in `shared/` directory
- Assets organized by type (images, audio, buttons, etc.)

## Import Style
- Angular core imports first
- Third-party library imports
- Local application imports
- Relative imports last

## Architecture Patterns
- **Container/Presentation**: Separates smart containers from dumb components
- **Service Layer**: Centralized API and business logic in services
- **Feature Modules**: Organized by feature/functionality
- **Reactive Programming**: Uses RxJS observables for async operations