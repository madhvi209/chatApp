import { useState } from 'react';
import ChatBox from '../components/chatBox.jsx';
import Message from '../components/message.jsx'; 

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { text: 'Hello! How can I help you today?', isUser: false },
        { text: 'I need some assistance with my account.', isUser: true },
    ]);

    const handleSendMessage = (newMessage) => {
        setMessages([...messages, { text: newMessage, isUser: true }]);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Chat Support</h2>

                {/* Render each message */}
                <div className="mb-4">
                    {messages.map((message, index) => (
                        <Message key={index} text={message.text} isUser={message.isUser} />
                    ))}
                </div>

                {/* ChatBox Component */}
                <ChatBox
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatPage;