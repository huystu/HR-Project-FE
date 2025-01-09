// src/components/ChatbotIcon.jsx
import { useState } from 'react';

import ChatbotModal from './ChatbotModal';
import '../styles/ChatbotIcon.css';

const ChatbotIcon = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <>
      <div className="chatbot-icon" onClick={showModal}>
        <img src="src/assets/Chatbot.png" width="50px"/>
      </div>
      <ChatbotModal visible={visible} handleClose={handleClose} />
    </>
  );
};

export default ChatbotIcon;
