'use client';

import { useState, useRef } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';

interface MessageType {
  type: 'system' | 'info' | 'user' | 'response' | 'hack' | 'easter-egg';
  text?: string;
  style?: React.CSSProperties;
  html?: string;
}

export default function Contact() {
  // State for easter egg discovery
  const [easterEggDiscovered, setEasterEggDiscovered] = useState(false);
  
  // State for terminal messages
  const [terminalMessages, setTerminalMessages] = useState<MessageType[]>([
    { type: 'system', text: '// Terminal access granted' },
    { type: 'system', text: '// Type commands or click "Hack Me" to continue...' },
  ]);
  
  // Ref for input
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize scroll animations
  useScrollAnimations();
  
  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const message = messageInputRef.current?.value.trim();
    if (!message) return;
    
    // Add user message to terminal
    setTerminalMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: message }
    ]);
    
    // Clear input
    if (messageInputRef.current) {
      messageInputRef.current.value = '';
    }
    
    // Add response after a short delay
    setTimeout(() => {
      setTerminalMessages(prevMessages => [
        ...prevMessages,
        { type: 'response', text: 'Message received! I\'ll get back to you soon.' }
      ]);
    }, 500);
  };
  
  // Handle hack button
  const handleHack = () => {
    // Clear terminal messages except form instructions
    setTerminalMessages([
      { type: 'hack', text: 'Initiating system hack...' }
    ]);
    
    // Add hacking sequence with delays
    setTimeout(() => {
      setTerminalMessages(prev => [...prev, { type: 'hack', text: 'Running security protocols...' }]);
    }, 800);
    
    setTimeout(() => {
      setTerminalMessages(prev => [...prev, { type: 'hack', text: 'Bypassing mainframe security...' }]);
    }, 1600);
    
    setTimeout(() => {
      setTerminalMessages(prev => [...prev, { type: 'hack', text: 'Accessing restricted area...' }]);
    }, 2400);
    
    setTimeout(() => {
      setTerminalMessages(prev => [...prev, { type: 'hack', text: 'ACCESS GRANTED!' }]);
    }, 3200);
    
    setTimeout(() => {
      setEasterEggDiscovered(true);
      setTerminalMessages(prev => [...prev, { 
        type: 'easter-egg', 
        html: `
<pre style="color: #0f0; font-size: 12px;">
█▀▀ █▀█ █▄░█ █▀▀ █▀█ ▄▀█ ▀█▀ █░█ █░░ ▄▀█ ▀█▀ █ █▀█ █▄░█ █▀ █
█▄▄ █▄█ █░▀█ █▄█ █▀▄ █▀█ ░█░ █▄█ █▄▄ █▀█ ░█░ █ █▄█ █░▀█ ▄█ ▄
</pre>
<p>You've discovered the Easter egg! Let's talk about working together.</p>
        `
      }]);
    }, 4000);
    
    // After Easter egg is revealed, show contact options
    setTimeout(() => {
      if (easterEggDiscovered) return;
      setTerminalMessages(prev => [
        ...prev,
        { type: 'system', text: '// leave your message below:', style: { marginTop: '15px' } }
      ]);
    }, 5000);
  };
  
  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Developer's Lair</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p>juan.flores.engineer@gmail.com</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">💻</div>
              <div>
                <h4>GitHub</h4>
                <p>github.com/EASYMAK777</p>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">🌐</div>
              <div>
                <h4>Website</h4>
                <p>jflores.vercel.app</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form">
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-button red"></div>
                <div className="terminal-button yellow"></div>
                <div className="terminal-button green"></div>
                <div className="terminal-title">terminal@juan-flores ~ %</div>
              </div>
              
              <div className="terminal-body">
                {terminalMessages.map((msg, index) => {
                  if (msg.type === 'easter-egg') {
                    return (
                      <div 
                        key={index} 
                        className="terminal-line"
                        dangerouslySetInnerHTML={{ __html: msg.html || '' }}
                      />
                    );
                  }
                  
                  return (
                    <div 
                      key={index} 
                      className="terminal-line"
                      style={msg.style || {}}
                    >
                      {msg.type === 'info' && <span style={{ color: '#f59e0b' }}>{msg.text?.split(':')[0]}:</span>}
                      {msg.type === 'info' ? msg.text?.split(':').slice(1).join(':') : ''}
                      
                      {msg.type === 'system' && msg.text}
                      
                      {msg.type === 'user' && (
                        <><span className="terminal-prompt">$</span> {msg.text}</>
                      )}
                      
                      {msg.type === 'response' && msg.text}
                      {msg.type === 'hack' && msg.text}
                    </div>
                  );
                })}
                
                {easterEggDiscovered ? (
                  <form id="contact-form" onSubmit={handleFormSubmit}>
                    <div className="terminal-input-line">
                      <span className="terminal-prompt">$</span>
                      <input 
                        type="text" 
                        className="terminal-input" 
                        placeholder="Enter your message..." 
                        id="message-input"
                        ref={messageInputRef}
                      />
                    </div>
                    
                    <div style={{ display: 'flex' }}>
                      <button type="submit" className="terminal-submit">
                        Send Message
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button 
                      type="button" 
                      className="hack-btn" 
                      onClick={handleHack}
                    >
                      Hack Me
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}