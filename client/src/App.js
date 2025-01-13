import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import HistorialTicketsPage from './components/HistorialTicketsPage';
import CreateUserStoryPage from './components/CreateUserStoryPage';
import EditTicketPage from './components/EditTicketPage';
import CreateTicketPage from './components/CreateTicketPage';
import CreateProject from './components/CreateProject';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/home" element={<HomePage />} />
  <Route path="/create-ticket" element={<CreateTicketPage />} />
  <Route path="/create-project" element={<CreateProject />} />
  <Route path="/tickets-history" element={<HistorialTicketsPage />} />
  <Route path="/create-user-story" element={<CreateUserStoryPage />} />
  <Route path="/edit-ticket/:ticketId" element={<EditTicketPage />} />
  <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

