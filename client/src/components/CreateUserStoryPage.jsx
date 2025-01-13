import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../redux/actions';
import { TextField, Button, Container, Typography } from '@mui/material';

const CreateUserStoryPage = () => {
  const [userStory, setUserStory] = useState({ title: '', description: '' });
  const [firstTicket, setFirstTicket] = useState({ title: '', description: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulación: Crear primero la historia y después el ticket vinculado
    const userStoryId = Math.random().toString(36).substr(2, 9); // ID temporal para prueba
    dispatch(createTicket({ ...firstTicket, userStoryId }));
    setUserStory({ title: '', description: '' });
    setFirstTicket({ title: '', description: '' });
  };

  return (
    <Container>
      <Typography variant="h5">Crear Historia de Usuario</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título de la Historia"
          name="title"
          value={userStory.title}
          onChange={(e) => setUserStory({ ...userStory, title: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={userStory.description}
          onChange={(e) => setUserStory({ ...userStory, description: e.target.value })}
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

export default CreateUserStoryPage;
