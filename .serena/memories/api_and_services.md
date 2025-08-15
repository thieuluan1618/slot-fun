# API and Services Configuration

## Environment Configuration

### Development Environment
- **API URL**: `https://gateway.api.jackpot2024.win/api`
- **Slot API URL**: `https://gateway.api.jackpot2024.win/slot/api`
- **Socket URL**: `https://socket.slot.game.jackpot2024.win/slot`
- **KiwiIRC URL**: `https://kiwiirc.com/client/irc-luan-dev.org/?nick=kiwi001|?&theme=mini#luan_channel`

### Chat Integration
- **Chat Width**: 320px
- **Chat Height**: 400px
- Uses KiwiIRC for embedded chat functionality

## Key Services

### ApiService (`src/app/services/api.service.ts`)
- Handles HTTP communication with game APIs
- Manages room joining/leaving for multiplayer functionality
- Integrates with wallet and betting systems

### AuthService (`src/app/services/auth.service.ts`)
- Manages user authentication using Auth0 JWT
- Handles token storage and validation
- Provides user session management

### SocketService (`src/app/services/socket.service.ts`)
- Manages real-time WebSocket connections using Socket.io
- Handles multiplayer game state synchronization
- Enables real-time communication between players

## External Dependencies

### Game Graphics (PIXI.js)
- Version: 8.5.0
- Used for slot machine reel animations
- Handles complex graphics rendering and animations

### State Management (NgRx)
- Version: 17.2.0
- Manages application state
- Handles game state, user data, and UI state

### Real-time Communication
- **Socket.io Client**: 4.8.0
- Connects to slot game servers
- Enables multiplayer features and real-time updates

### UI Framework
- **Bootstrap**: 5.3.2 with ng-bootstrap 16.0.0
- Provides responsive design components
- Used for modal dialogs, buttons, and layout

## Security Considerations
- All API endpoints use HTTPS
- JWT tokens for authentication
- Environment-based configuration prevents hardcoded secrets
- Safe pipe used for HTML content sanitization

## Development Notes
- Services follow singleton pattern via Angular DI
- Reactive programming with RxJS observables
- Environment variables switch between dev/prod configurations
- API calls include proper error handling and loading states