// src/components/CharbotModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Input, } from 'antd';
import { TbSend2 } from "react-icons/tb";
import ImgButton from './ImgButton';
import { CloseOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import '../styles/ChatbotModal.css';

const ChatbotModal = ({ visible, handleClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (visible) {
            const modalContent = document.querySelector('.ant-modal-content');
            if(modalContent) {
                modalContent.style.padding = '0';
            }
        }
    }, [visible]);
    
    const handleSendMessage = () => {
        if (input.trim()) {
            const now = new Date();
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            const time = now.toLocaleTimeString('en-US', options);
            const userMessage = { text: input, isUser: true, time: time };
            setMessages([...messages, userMessage]);
            setInput('');

            // 챗봇 응답 추가
            setTimeout(() => {
                if (input.toLowerCase() === 'hi') {
                    const botMessage = { text: 'Hi', isUser: false, time: time };
                    setMessages(prevMessages => [...prevMessages, botMessage]);
                }
            }, 500); // 응답 지연 시간 (선택 사항)
        }
    };
    
    return (
        <Modal visible={visible} onCancel={handleClose} footer={null} width="330px"
        centered
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        >
            <div className="chat">
                <div className="chat-header">
                    <h2>HR Buddy</h2>
                </div>
                <div className="chatbox">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.isUser ? 'user-msg' : 'bot-msg'}`}>
                            <div className="chat-name">
                                {msg.isUser ? "USER NAME" : <><img src="src/assets/Chatbot.png" width="20px"/><span> HR Buddy</span></>} 
                            </div>
                            <div className="chat-msg">
                                {msg.text}
                            </div>
                            <div className="chat-date">
                                {msg.time}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="type-msg">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onPressEnter={handleSendMessage}
                        placeholder="Type your message..."
                    />
                    <ImgButton onClick={handleSendMessage}><TbSend2 /></ImgButton>
                </div>
            </div>
    </Modal>
  );
};

ChatbotModal.propTypes = {
    visible: PropTypes.boolean,
    handleClose: PropTypes.func,
};

export default ChatbotModal;
