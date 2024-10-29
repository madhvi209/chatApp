import { useState } from 'react';
import PropTypes from 'prop-types';

const ChatBox = ({ messages =[], onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg shadow-md transition duration-200 ease-in-out ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center p-3 border-t border-gray-300">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

ChatBox.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            isUser: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onSendMessage: PropTypes.func.isRequired,
};

export default ChatBox;
