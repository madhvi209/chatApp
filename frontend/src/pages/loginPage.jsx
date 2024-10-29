import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin(username);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Username Input */}
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username or Email</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                            placeholder="Enter your username or email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Log In
                    </button>

                    {/* Optional: Forgot Password Link */}
                    <div className="text-center">
                        <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
