/**
 * App Component - Main Application Container
 * 
 * Orchestrates security tracking between PasswordInput and SubmitButton.
 * Collects and manages security events from child components.
 * 
 * State: 
 *   - securityEvents (Array) - Collected security events
 *   - isSubmitting (Boolean) - Form submission state
 * 
 * Connected to: PasswordInput (child), SubmitButton (child)
 */

import { useState } from 'react';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import '../App.css';  // Fixed import path

const App = () => {
  // State for collected security events
  const [securityEvents, setSecurityEvents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * handlePasswordChange - Callback for password security events
   * Collects typing patterns for bot detection analysis
   * @param {Object} eventData - Security event data from PasswordInput
   */
  const handlePasswordChange = (eventData) => {
    const securityEvent = {
      ...eventData,
      id: Date.now() + Math.random(),
      collectedAt: new Date().toISOString()
    };
    
    // Store event (keep last 50 events for performance)
    setSecurityEvents(prev => {
      const newEvents = [...prev, securityEvent];
      return newEvents.slice(-50);
    });
    
    // Log for immediate monitoring
    console.log('Security Event - Password Interaction:', securityEvent);
  };
  
  /**
   * handleSubmit - Processes form submission with security validation
   * @param {Event} event - Form submission event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate security analysis (to be replaced with actual security API)
    setTimeout(() => {
      const analysisResults = analyzeSecurityEvents(securityEvents);
      
      console.log('Security Analysis Complete:', {
        timestamp: new Date().toISOString(),
        totalEvents: securityEvents.length,
        typingEvents: securityEvents.filter(e => e.eventType === 'password_change').length,
        analysis: analysisResults,
        verdict: analysisResults.isSuspicious ? 'REVIEW_NEEDED' : 'CLEAN'
      });
      
      alert(analysisResults.message);
      setIsSubmitting(false);
    }, 1500);
  };
  
  /**
   * analyzeSecurityEvents - Mock security analysis function
   * Security engineers can replace this with actual bot detection algorithms
   * @param {Array} events - Collected security events
   * @returns {Object} Analysis results
   */
  const analyzeSecurityEvents = (events) => {
    const typingEvents = events.filter(e => e.eventType === 'password_change');
    
    // Simple heuristic checks (expandable by security team)
    const checks = {
      hasTypingEvents: typingEvents.length > 0,
      typingSpeed: calculateTypingSpeed(typingEvents),
      eventPattern: checkEventPattern(events)
    };
    
    const isSuspicious = !checks.hasTypingEvents || checks.typingSpeed === 'too_fast';
    
    return {
      isSuspicious,
      checks,
      message: isSuspicious 
        ? '⚠️ Unusual patterns detected. Please try again.'
        : '✅ Security check passed. Form submitted successfully.'
    };
  };
  
  /**
   * calculateTypingSpeed - Simple typing speed analyzer
   * Security engineers can enhance with more sophisticated algorithms
   */
  const calculateTypingSpeed = (typingEvents) => {
    if (typingEvents.length < 2) return 'unknown';
    
    const firstEvent = typingEvents[0];
    const lastEvent = typingEvents[typingEvents.length - 1];
    const timeDiff = lastEvent.timestamp - firstEvent.timestamp;
    const charsPerSecond = (typingEvents.length / timeDiff) * 1000;
    
    return charsPerSecond > 20 ? 'too_fast' : 'normal';
  };
  
  /**
   * checkEventPattern - Basic pattern checking
   * Placeholder for security team's pattern detection algorithms
   */
  const checkEventPattern = (events) => {
    // Implement pattern detection logic here
    return 'basic_pattern_ok';
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔒 Secure Password System</h1>
        <p className="app-subtitle">
          Advanced bot protection through behavioral analysis
        </p>
      </header>
      
      <main className="app-main">
        <form className="security-form" onSubmit={handleSubmit} data-testid="security-form">
          <div className="form-section">
            <h2>Password Entry</h2>
            <PasswordInput onPasswordChange={handlePasswordChange} />
            <p className="form-hint">
              Type naturally - we analyze typing patterns for security
            </p>
          </div>
          
          <div className="form-section">
            <h2>Security Verification</h2>
            <div className="security-indicators">
              <div className="indicator">
                <span className="indicator-label">Events Tracked:</span>
                <span className="indicator-value" data-testid="events-tracked">
                  {securityEvents.length}
                </span>
              </div>
              <div className="indicator">
                <span className="indicator-label">Status:</span>
                <span className={`indicator-value ${isSubmitting ? 'processing' : 'ready'}`}>
                  {isSubmitting ? 'Analyzing...' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <SubmitButton 
              onClick={handleSubmit}
              disabled={isSubmitting}
            />
          </div>
        </form>
        
        <div className="security-info">
          <h3>🔍 Security Tracking Active</h3>
          <ul>
            <li>Typing cadence analysis</li>
            <li>Mouse movement patterns</li>
            <li>Behavioral anomaly detection</li>
            <li>Real-time event logging</li>
          </ul>
          <p className="info-note">
            Check browser console for detailed security logs
          </p>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Security System v1.0 • Event Handling Lab</p>
      </footer>
    </div>
  );
};

export default App;