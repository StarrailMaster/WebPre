"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './merchantRecommend.module.css';
import { useRouter } from 'next/navigation';

const MerchantRecommend = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'Hello Merchant! I can assist you with supply chain strategies, inventory management, and provide recommendations to help improve your product offerings. Please let me know your questions.' }
  ]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await axios.post('http://13.55.190.75:8080/api/merchant_recommend/generateRecommend', {
        searchText: input
      });
      const botReply = { sender: 'system', text: response.data.recommendContent };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error('Message sending failed', error);
      const errorMessage = { sender: 'system', text: 'Sorry, something went wrong. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Merchant Service</h1>
      <div className={styles.chatBox} ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === 'user' ? styles.userMessage : styles.systemMessage
            }
            style={{ alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            <p style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>{message.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Please enter your question..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.sendButton}>Send</button>
        <button onClick={() => router.replace('/roleSelection')} className={styles.backButton}>Back</button>
      </div>
    </div>
  );
};

export default MerchantRecommend;
