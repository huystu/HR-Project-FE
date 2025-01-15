// src/components/CharbotModal.jsx
import { useState, useEffect, useRef } from 'react';
import { Modal, Input, } from 'antd';
import { TbSend2 } from "react-icons/tb";
import ImgButton from './ImgButton';
import { CloseOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import '../styles/ChatbotModal.css';

import api, { setAuthToken } from '../api';

const ChatbotModal = ({ visible, handleClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // 선택된 제안 인덱스 상태 추가
    const suggestionRefs = useRef([]); // 제안 요소에 대한 참조 배열
    const chatboxRef = useRef(null); // 대화 상자를 참조

    // 메시지가 업데이트될 때마다 대화 상자의 스크롤 위치를 맨 아래로 조정
    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    // useEffect(() => {
    //     if (visible) {
    //         const modalContent = document.querySelector('.ant-modal-content');
    //         if(modalContent) {
    //             modalContent.style.padding = '0';
    //         }
    //     }
    // }, [visible]);

    const accessToken = localStorage.getItem('token');

    const [suggestion, setSuggestion] = useState([]);

    const handleInput = async (e) => {
        const newInput = e.target.value;
        if (newInput==='') {
            setSuggestion([]);
            setInput('');
            return;
        }
        setInput(newInput);
        console.log(newInput);

        setAuthToken(accessToken);

        try {
            const response = await api.post("/api/suggest", { input: input });

            if (response.status === 200) {
                console.log(response);

                const suggest = response.data.data;

                setSuggestion(suggest);
                setSelectedSuggestionIndex(-1); // 제안 목록 갱신 시 선택된 인덱스 초기화

                console.log(suggestion);
            }
        }
        catch (error) {
            console.error("Error text suggestion:", error);
            alert("An error occurred while suggesting some text.");
        }
    }
    
    const handleSendMessage = async () => {
        if (input.trim()) {
            const now = new Date();
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            const time = now.toLocaleTimeString('en-US', options);
            const userMessage = { text: input, isUser: true, time: time };

            console.log(userMessage);

            setMessages([...messages, userMessage]);
            setInput('');

            setAuthToken(accessToken);
            const loginUserID = localStorage.getItem('loginUserId');
            const headers = { "Session-ID": loginUserID, };

            const data = {
                contents: [
                    {
                        parts: [
                            {
                                text: input,
                            }
                        ]
                    }
                ]
            };

            try {
                const response = await api.post("/api/gemini/process-query", data, { headers });
    
                if (response.status === 200) {
                    console.log("chatbot process-query: ", response);
                    const answer = response.data.data;
                    const botMessage = { text: answer, isUser: false, time: time };
                    setMessages(prevMessages => [...prevMessages, botMessage]);
                }
            }
            catch (error) {
                console.error("Error chatbot process-query:", error);
                alert("An error occurred during chatbot process-query.");
            }
        }
    };

    const handleSuggestionClick = (suggest) => {
        setInput(suggest);
        setSuggestion([]); // 제안 목록을 초기화
        setSelectedSuggestionIndex(-1); // 선택된 인덱스 초기화
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) { // Shift + Tab: 역방향으로 이동
                const prevIndex = (selectedSuggestionIndex - 1 + suggestion.length) % suggestion.length;
                setSelectedSuggestionIndex(prevIndex);
                setInput(suggestion[prevIndex]);
            }
            else { // Tab: 순방향으로 이동
                const nextIndex = (selectedSuggestionIndex + 1) % suggestion.length;
                setSelectedSuggestionIndex(nextIndex);
                setInput(suggestion[nextIndex]);
            }
        }
        else if (e.key === 'Enter' && selectedSuggestionIndex >= 0) {
            e.preventDefault();
            handleSuggestionClick(suggestion[selectedSuggestionIndex]);
            setInput('');
        }
    };

    useEffect(() => {
        if (selectedSuggestionIndex >= 0 && suggestionRefs.current[selectedSuggestionIndex]) {
            suggestionRefs.current[selectedSuggestionIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selectedSuggestionIndex]);
    
    return (
        <Modal visible={visible} onCancel={handleClose} footer={null} width="400px"
        centered
        closeIcon={<CloseOutlined style={{ color: 'white' }} />}
        >
            <div className="chat">
                <div className="chat-header">
                    <h2>HR Buddy</h2>
                </div>
                <div className="chatbox" ref={chatboxRef}>
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
                <div className="text-suggest-box">
                    {suggestion.map((msg, index) => (
                        <span
                            className={`text-suggest ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handleSuggestionClick(msg)}
                            ref={el => suggestionRefs.current[index] = el}
                        >
                            {msg}
                        </span>
                    ))}
                </div>
                <div className="type-msg">
                    <Input
                        value={input}
                        onChange={(e) => handleInput(e)}
                        onPressEnter={handleSendMessage}
                        onKeyDown={handleKeyDown}
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
