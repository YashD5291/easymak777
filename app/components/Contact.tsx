'use client';

import { useState, useRef } from 'react';
import useScrollAnimations from '../hooks/useScrollAnimations';

interface MessageType {
  type: 'system' | 'info' | 'user' | 'response' | 'hack' | 'easter-egg' | 'error';
  text?: string;
  style?: React.CSSProperties;
  html?: string;
}

export default function Contact() {
  // State for easter egg discovery
  const [easterEggDiscovered, setEasterEggDiscovered] = useState(false);
  // State for hacking in progress
  const [hackingInProgress, setHackingInProgress] = useState(false);
  
  // State for terminal messages
  const [terminalMessages, setTerminalMessages] = useState<MessageType[]>([
    { type: 'system', text: '// Terminal access granted' },
    { type: 'system', text: '// Type "help" for available commands' },
  ]);
  
  // Ref for input
  const messageInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize scroll animations
  useScrollAnimations();
  
  // Focus input when component mounts
  const focusInput = () => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  };
  
  // Process command input
  const processCommand = (command: string) => {
    if (hackingInProgress) return;
    
    const cmd = command.toLowerCase().trim();
    
    // Add user command to terminal
    setTerminalMessages(prev => [
      ...prev,
      { type: 'user', text: command }
    ]);
    
    // Process different commands
    if (cmd === 'help') {
      setTimeout(() => {
        setTerminalMessages(prev => [
          ...prev,
          { type: 'system', text: 'Available commands:' },
          { type: 'info', text: 'help: Display this help message' },
          { type: 'info', text: 'clear: Clear the terminal' },
          { type: 'info', text: 'access: Attempt to access restricted areas' },
          { type: 'info', text: 'whoami: Display current user' },
          { type: 'info', text: 'ls: List directory contents' },
        ]);
      }, 300);
    } else if (cmd === 'clear') {
      setTerminalMessages([
        { type: 'system', text: '// Terminal cleared' },
        { type: 'system', text: '// Type "help" for available commands' },
      ]);
    } else if (cmd === 'hack' || cmd === 'access' || cmd === 'sudo hack' || cmd === 'sudo access') {
      initiateHackSequence();
    } else if (cmd === 'whoami') {
      setTimeout(() => {
        setTerminalMessages(prev => [
          ...prev,
          { type: 'response', text: 'guest@terminal' },
        ]);
      }, 300);
    } else if (cmd === 'ls') {
      setTimeout(() => {
        setTerminalMessages(prev => [
          ...prev,
          { type: 'system', text: 'system/ projects/ about/ security/' },
        ]);
      }, 300);
    } else if (cmd.startsWith('cd ')) {
      setTimeout(() => {
        setTerminalMessages(prev => [
          ...prev,
          { type: 'system', text: 'Permission denied: Elevated access required' },
        ]);
      }, 300);
    } else {
      setTimeout(() => {
        setTerminalMessages(prev => [
          ...prev,
          { type: 'error', text: `Command not found: ${command}` },
        ]);
      }, 300);
    }
  };
  
  // Handle form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const message = messageInputRef.current?.value.trim();
    if (!message) return;
    
    if (easterEggDiscovered) {
      // Easter egg discovered, handle as message
      setTerminalMessages(prevMessages => [
        ...prevMessages,
        { type: 'user', text: message }
      ]);
      
      // Add response after a short delay
      setTimeout(() => {
        setTerminalMessages(prevMessages => [
          ...prevMessages,
          { type: 'response', text: 'Message received! I\'ll get back to you soon.' }
        ]);
        
        // Reset to command mode after sending message
        setTimeout(() => {
          setEasterEggDiscovered(false);
          setTerminalMessages([
            { type: 'system', text: '// Terminal reset' },
            { type: 'system', text: '// Type "help" for available commands' },
          ]);
        }, 1500);
      }, 500);
    } else {
      // Easter egg not discovered, handle as command
      processCommand(message);
    }
    
    // Clear input
    if (messageInputRef.current) {
      messageInputRef.current.value = '';
    }
  };
  
  // Handle hack sequence
  const initiateHackSequence = () => {
    if (hackingInProgress) return;
    setHackingInProgress(true);
    
    // Clear terminal messages and start hack sequence
    setTerminalMessages(prev => [
      ...prev,
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
      setHackingInProgress(false);
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
            <div className="terminal" onClick={focusInput}>
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
                      
                      {msg.type === 'system' && <span style={{ color: '#0f0' }}>{msg.text}</span>}
                      
                      {msg.type === 'user' && (
                        <><span className="terminal-prompt">$</span> {msg.text}</>
                      )}
                      
                      {msg.type === 'response' && <span style={{ color: '#fff' }}>{msg.text}</span>}
                      {msg.type === 'hack' && <span style={{ color: '#f00' }}>{msg.text}</span>}
                      {msg.type === 'error' && <span style={{ color: '#f00' }}>{msg.text}</span>}
                    </div>
                  );
                })}
                
                <form id="contact-form" onSubmit={handleFormSubmit}>
                  <div className="terminal-input-line">
                    <span className="terminal-prompt">$</span>
                    <input 
                      type="text" 
                      className="terminal-input" 
                      placeholder={easterEggDiscovered ? "Enter your message..." : "Type a command..."}
                      id="message-input"
                      ref={messageInputRef}
                      autoFocus
                      disabled={hackingInProgress}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}