import axios from 'axios';
import USER_API_END_POINT from "../../utils/const"

const API_BASE_URL = `${USER_API_END_POINT}/login`; // Replace with your backend API URL

// Set up axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle user login
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/login', { username, password });
        return response.data; // Token or user data
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Function to fetch chat messages
export const getMessages = async (chatId) => {
    try {
        const response = await api.get(`/chats/${chatId}/messages`);
        return response.data; // Array of messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

// Function to send a new message
export const sendMessage = async (chatId, message, token) => {
    try {
        const response = await api.post(
            `/chats/${chatId}/messages`,
            { text: message },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data; // New message data
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

// Function to get user info (if needed)
export const getUserInfo = async (token) => {
    try {
        const response = await api.get('/user', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // User info
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};
