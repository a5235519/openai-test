import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Chat.module.css';

export default function Chat() {
  const [messages, setMessages] = useState([
    { content: 'Hello, how can I help you?', sender: 'ChatGPT' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendButtonClick = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newMessage = { content: inputValue, sender: 'User' };
    setMessages([...messages, newMessage]);
    setInputValue('');

    generateChatGptMessage(inputValue);
  };

  const generateChatGptMessage = async (message) => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setMessages([...messages, {
        content: data.result,
        sender: 'ChatGPT'
      }]);
      
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.chatWindow}>
      <Head>
        <title>ChatGPT</title>
      </Head>
      <div className={styles.chatHeader}>
        <h1>ChatGPT</h1>
      </div>
      <div className={styles.chatBody}>
        {messages.map((message, index) => (
          <div className={styles.chatMessageContainer} key={index}>
            <div
              className={`${styles.chatMessage} ${
                message.sender === 'ChatGPT'
                  ? styles.chatMessageReceived
                  : styles.chatMessageSent
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatFooter}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendButtonClick}>Send</button>
      </div>
    </div>
  );
}