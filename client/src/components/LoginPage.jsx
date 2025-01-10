import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, getCompanies } from '../redux/actions';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    user: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para redirección

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  const handleRegister = async () => {
    try {
      // Llamar a la acción para cargar las compañías
      await dispatch(getCompanies());
      // Redirigir a la página de registro
      navigate('/register');
    } catch (error) {
      console.error('Error al cargar las compañías:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h5">Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de Usuario"
          name="user"
          value={credentials.user}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Iniciar Sesión
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
          onClick={handleRegister}
        >
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;