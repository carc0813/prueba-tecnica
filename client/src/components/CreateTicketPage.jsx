import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, getUserStories } from '../redux/actions';
import { TextField, Button, Select, MenuItem, Container, Typography } from '@mui/material';

const CreateTicketPage = () => {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    comments: '', // Nuevo campo para comentarios
    status: 'Activo',
    story_id: '',
  });
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  const dispatch = useDispatch();
  const userStories = useSelector((state) => state.userStories.userStories);

  useEffect(() => {
    dispatch(getUserStories());
  }, [dispatch]);

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket(ticketData));
    setTicketData({ title: '', description: '', comments: '', status: 'Activo', story_id: '' });
  };

  const filteredStories = userStories
    ? userStories.filter((story) => selectedStatus === 'Todos' || story.status === selectedStatus)
    : [];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Crear Ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título del Ticket"
          name="title"
          value={ticketData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={ticketData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Comentarios"
          name="comments"
          value={ticketData.comments}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          Seleccionar Historia de Usuario
        </Typography>
        <Select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Todos">Todos</MenuItem>
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="En Proceso">En Proceso</MenuItem>
          <MenuItem value="Finalizado">Finalizado</MenuItem>
        </Select>
        <Select
          name="story_id"
          value={ticketData.story_id || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <MenuItem key={story.id} value={story.id}>
                {story.title} ({story.status})
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              No hay historias disponibles
            </MenuItem>
          )}
        </Select>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Crear Ticket
        </Button>
      </form>
    </Container>
  );
};

export default CreateTicketPage;



