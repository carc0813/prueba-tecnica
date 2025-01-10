// RegisterUserPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions';
import { getCompanies } from '../redux/actions';
import { TextField, Button, MenuItem, Select, Container, Typography } from '@mui/material';

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    company_id: '', 
  });
 const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const companies = useSelector((state) => state.companies);
  //console.log("Loaded companies:", companies); // Verifica que este array esté actualizado
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);
 //console.log('Companies:', companies); // Verifica que es un array

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData))
    .then(response => {
      console.log('Usuario registrado:', response);
      // Aquí puedes redirigir al usuario o mostrar un mensaje
      // Redirigir después de un registro exitoso
      navigate('/login');
    })
    .catch(error => {
      console.error('Error en el registro:', error);
      // Aquí puedes mostrar un mensaje de error
    });
  };

  return (
    <Container>
      <Typography variant="h5">Crear Cuenta</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de Usuario"
          name="username"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        {/* <TextField
          label="Correo Electrónico"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        /> */}
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Select
  name="company_id"
  value={userData.company_id}
  onChange={handleChange}
  fullWidth
  margin="normal"
>
  {Array.isArray(companies) && companies.length > 0 ? (
    companies.map((company) => (
      <MenuItem key={company.id} value={company.id}>
        {company.name}
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled value="">
      No hay empresas disponibles
    </MenuItem>
  )}
   </Select>
        
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </form>
    </Container>
  );
};

export default RegisterPage;