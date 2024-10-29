/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ text, isUser }) => {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
            <div
                className={`max-w-xs p-4 rounded-lg shadow-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
            >
                <p className="whitespace-pre-wrap">{text}</p>
            </div>
        </div>
    );
};

Message.propTypes = {
    text: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
};

export default Message;
