import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import CreateTicketPage from './components/CreateTicketPage';
import CreateProject from './components/CreateProject';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Página de inicio de sesión (Login) */}
          <Route path="/login" element={<LoginPage />} />

          {/* Página de registro */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Página principal (Home) */}
          <Route path="/home" element={<HomePage />} />

          {/* Página para crear un ticket */}
          <Route path="/create-ticket" element={<CreateTicketPage />} />

          {/* Página para crear un proyecto */}
          <Route path="/create-project" element={<CreateProject />} />

          {/* Redirigir la raíz a la página de inicio de sesión */}
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

