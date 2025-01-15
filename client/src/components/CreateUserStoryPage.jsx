import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserStory, createTicket } from '../redux/actions';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CreateUserStoryPage = () => {
  const [userStory, setUserStory] = useState({ projectId: '', title: '', description: '' });
  const [firstTicket, setFirstTicket] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserStory({ ...userStory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar que los campos estén completos
      if (!userStory.projectId || !userStory.title || !userStory.description || !firstTicket.title || !firstTicket.description) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      // Crear la historia de usuario
      const createdUserStory = await dispatch(createUserStory(userStory));

      // Crear el ticket asociado si la historia fue creada con éxito
      if (createdUserStory?.id) {
        await dispatch(createTicket({ ...firstTicket, userStoryId: createdUserStory.id }));
      } else {
        throw new Error('No se pudo obtener el ID de la historia de usuario creada.');
      }

      // Limpiar los estados y errores
      setUserStory({ projectId: '', title: '', description: '' });
      setFirstTicket({ title: '', description: '' });
      setError('');
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al crear la historia o el ticket.');
    }
  };

  return (
    <Container>
      <Typography variant="h5">Crear Historia de Usuario</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Proyecto</InputLabel>
          <Select
            name="projectId"
            value={userStory.projectId}
            onChange={handleChange}
            required
          >
            {/* Opciones de ejemplo, reemplazar con proyectos reales */}
            <MenuItem value={1}>Proyecto 1</MenuItem>
            <MenuItem value={2}>Proyecto 2</MenuItem>
            <MenuItem value={3}>Proyecto 3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Título de la Historia"
          name="title"
          value={userStory.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={userStory.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Primer Ticket Asociado
        </Typography>
        <TextField
          label="Título del Ticket"
          name="title"
          value={firstTicket.title}
          onChange={(e) => setFirstTicket({ ...firstTicket, title: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción del Ticket"
          name="description"
          value={firstTicket.description}
          onChange={(e) => setFirstTicket({ ...firstTicket, description: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Crear Historia y Ticket
        </Button>
      </form>
    </Container>
  );
};

export default CreateUserStoryPage ;

