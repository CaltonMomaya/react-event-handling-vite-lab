## Security Event Tracking System

This project implements advanced anti-bot protection through behavioral analysis of user interactions.

### Security Features

#### Password Input Tracking
- **Typing Cadence Analysis**: Monitors speed and rhythm of password entry
- **Character Pattern Detection**: Tracks typing patterns for anomaly detection
- **Real-time Logging**: Security events logged to console for analysis

#### Mouse Movement Tracking
- **Hover Pattern Analysis**: Tracks mouse enter/leave events on submit button
- **Movement Timing**: Measures hover duration and movement patterns
- **Bot Detection**: Identifies non-human interaction patterns

### Event Handlers Implemented

#### PasswordInput Component
- `handleChange()`: Tracks password typing events
  - Logs: "Entering password…"
  - Data collected: Timestamp, character count, typing patterns

#### SubmitButton Component
- `handleMouseEnter()`: Tracks mouse entry events
  - Logs: "Mouse Entering"
  - Data collected: Coordinates, timing
- `handleMouseLeave()`: Tracks mouse exit events
  - Logs: "Mouse Exiting"
  - Data collected: Hover duration, exit patterns
- `handleClick()`: Processes form submission with security validation

### Security Data Flow

1. **User Interaction** → Component Event Handler
2. **Security Logging** → Console output with detailed data
3. **Data Collection** → App-level security event aggregation
4. **Analysis** → Basic pattern detection algorithms
5. **Verdict** → Security assessment (CLEAN/REVIEW_NEEDED)

### Testing Security Features

Run the comprehensive test suite:
```bash
npm test




## Key Changes for Your Structure:

1. **Component Organization**: Components remain in `src/components/`
2. **Test Files**: Updated existing test files in `src/__tests__/`
3. **Entry Point**: `main.jsx` enhanced with security initialization
4. **Styling**: Comprehensive CSS for visual feedback
5. **Documentation**: Added security features to existing README

## Running the Application:

```bash
# Install dependencies (if not already)
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage


## Security Event Tracking System

### Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install