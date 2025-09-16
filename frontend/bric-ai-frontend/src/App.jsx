import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

// Componente para proteger rotas que precisam de autenticação
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Componente para redirecionar usuários logados
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="content" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                  <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Conteúdo</h1>
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <p className="text-gray-600">Módulo de conteúdo em desenvolvimento...</p>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="achievements" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                  <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Conquistas</h1>
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <p className="text-gray-600">Módulo de conquistas em desenvolvimento...</p>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="community" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
                  <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Comunidade</h1>
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <p className="text-gray-600">Módulo de comunidade em desenvolvimento...</p>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

