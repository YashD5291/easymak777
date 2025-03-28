'use client';

import { useEffect, useState } from 'react';

interface TerminalProps {
  messages: string[];
  typingSpeed?: number;
  onComplete?: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ 
  messages, 
  typingSpeed = 30, 
  onComplete 
}) => {
  const [text, setText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete || messageIndex >= messages.length) {
      if (onComplete && isComplete) {
        onComplete();
      }
      return;
    }

    const currentMessage = messages[messageIndex];

    // If we have processed all characters in the current message
    if (charIndex >= currentMessage.length) {
      // Short pause between messages
      const nextMessageTimeout = setTimeout(() => {
        setMessageIndex(messageIndex + 1);
        setCharIndex(0);
        setText(text => text + '\n\n'); // Add line breaks between messages
      }, 500);

      return () => clearTimeout(nextMessageTimeout);
    }

    // Type one character at a time
    const typeCharTimeout = setTimeout(() => {
      setText(text => text + currentMessage.charAt(charIndex));
      setCharIndex(charIndex + 1);
    }, typingSpeed);

    return () => clearTimeout(typeCharTimeout);
  }, [messageIndex, charIndex, messages, text, typingSpeed, onComplete, isComplete]);

  // Mark as complete when all messages have been typed
  useEffect(() => {
    if (messageIndex >= messages.length && !isComplete) {
      setIsComplete(true);
    }
  }, [messageIndex, messages.length, isComplete]);

  return (
    <div className="matrix-terminal" style={{ opacity: messages.length > 0 ? 1 : 0 }}>
      <pre id="terminal-text">
        {text}
        <span className="cursor"></span>
      </pre>
    </div>
  );
};

export default Terminal; 