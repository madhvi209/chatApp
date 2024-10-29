import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage.jsx';
import ChatPage from './pages/chatPage.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUser(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-blue-500 p-4 text-white text-center font-semibold">
          <h1 className="text-xl">Chat Application</h1>
        </header>

        <main className="flex-1 p-4">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/chat" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/chat"
              element={
                isAuthenticated ? (
                  <ChatPage user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </main>

        <footer className="bg-blue-500 p-4 text-white text-center">
          &copy; {new Date().getFullYear()} Chat Application
        </footer>
      </div>
    </Router>
  );
};

export default App;
