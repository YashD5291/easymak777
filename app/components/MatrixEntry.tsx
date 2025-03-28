'use client';

import { useState, useEffect, useRef } from 'react';

export default function MatrixEntry({ onFinishSequence }: { onFinishSequence: () => void }) {
    const [completedMessageIndexes, setCompletedMessageIndexes] = useState<number[]>([]);
    const [activeMessageIndex, setActiveMessageIndex] = useState<number | null>(null);
    const [activeMessageText, setActiveMessageText] = useState('');
    const [terminalVisible, setTerminalVisible] = useState(false);
    const [terminalText, setTerminalText] = useState('');

    console.log(completedMessageIndexes, "completedMessageIndexes");
    console.log(activeMessageIndex, "activeMessageIndex");
    console.log(activeMessageText, "activeMessageText");
    console.log(terminalVisible, "terminalVisible");
    console.log(terminalText, "terminalText");

    const terminalRef = useRef<HTMLDivElement | null>(null);

    // Matrix messages data
    const messages = [
        {
            id: 'message2',
            text: 'The Matrix has you!',
            specialLetters: [
                // { index: 0, class: 'big-letter' }, // 'T'
                // { index: 4, class: 'big-letter' }  // 'M'
            ]
        },
        {
            id: 'message3',
            text: 'Follow the white rabbit...',
            specialLetters: [
                // { index: 0, class: 'big-letter' } // 'F'
            ]
        },
    ];

    // Sleep helper function
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Clean typing effect
    const typeMessage = async (index: number) => {
        if (index >= messages.length) {
            setCompletedMessageIndexes(prev => [...prev, index]);
            // Final delay before transitioning to pill choice
            await sleep(1500);

            // Call the callback to finish the sequence
            onFinishSequence();
            // await terminalTyping();
            return;
        }

        setActiveMessageIndex(index);
        const message = messages[index];
        const baseDelay = 100; // ms per character

        // Type each character with delay
        setActiveMessageText('');
        for (let i = 0; i < message.text.length; i++) {
            setActiveMessageText(message.text.substring(0, i + 1));
            await sleep(baseDelay);
        }

        // Mark this message as completed
        setCompletedMessageIndexes(prev => [...prev, index]);

        // Keep message visible and wait before showing next message
        await sleep(1000);

        // Move to next message (but keep the current one visible)
        typeMessage(index + 1);
    };

    // Terminal typing effect
    const terminalTyping = async () => {
        setTerminalVisible(true);

        const text = 'Loading Juan Flores portfolio... Access granted.';
        const baseDelay = 70; // ms per character

        for (let i = 0; i < text.length; i++) {
            setTerminalText(prev => prev + text.charAt(i));
            await sleep(baseDelay);
        }

        // Final delay before transitioning to pill choice
        await sleep(1500);

        // Call the callback to finish the sequence
        onFinishSequence();
    };

    // Start the typing sequence on component mount
    useEffect(() => {
        const startSequence = async () => {
            // Initial delay before starting
            await sleep(1000);
            typeMessage(0);
        };

        startSequence();
    }, []);

    return (
        <div id="matrix-entry">
            {messages.map((message, index) => {
                // Determine if this message should be visible
                const isActive = activeMessageIndex === index;
                const isCompleted = completedMessageIndexes.includes(index);
                const isVisible = isActive || isCompleted;

                return (
                    <div
                        key={message.id}
                        id={message.id}
                        className={`matrix-message ${isActive ? 'active' : isCompleted ? 'completed' : ''
                            }`}
                        style={{ display: isVisible ? 'block' : 'none' }}
                    >
                        {isActive ? (
                            // Currently typing message
                            <>
                                {activeMessageText.split('').map((char, charIndex) => {
                                    // // Check if this character should have special formatting
                                    // const specialChar = message.specialLetters.find(sl => sl.index === charIndex);

                                    // if (specialChar) {
                                    //     return (
                                    //         <span key={charIndex} className={specialChar.class}>
                                    //             {char}
                                    //         </span>
                                    //     );
                                    // }

                                    return char;
                                })}
                                <span className="cursor"></span>
                            </>
                        ) : isCompleted ? (
                            // Already typed message
                            <>
                                {message.text.split('').map((char, charIndex) => {
                                    // Check if this character should have special formatting
                                    // const specialChar = message.specialLetters.find(sl => sl.index === charIndex);

                                    // if (specialChar) {
                                    //     return (
                                    //         <span key={charIndex} className={specialChar.class}>
                                    //             {char}
                                    //         </span>
                                    //     );
                                    // }

                                    return char;
                                })}
                            </>
                        ) : null}
                    </div>
                );
            })}

            <div className="matrix-terminal" style={{ opacity: terminalVisible ? 1 : 0 }}>
                <span id="terminal-text" ref={terminalRef}>{terminalText}</span>
                <span className="cursor"></span>
            </div>
        </div>
    );
}