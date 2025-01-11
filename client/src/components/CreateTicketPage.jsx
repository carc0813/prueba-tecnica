import React, { useState, /* useEffect*/ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket } from '../redux/actions';
//import { getUserStories } from '';
import { TextField, Button, Select, MenuItem, Container, Typography } from '@mui/material';

const CreateTicketPage = () => {
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    status: 'Activo',
    story_id: '', // Ajusta la clave para que coincida con el backend
  });
  const dispatch = useDispatch();

  const userStories = useSelector((state) => state.userStories.userStories);

  // useEffect(() => {
  //   dispatch(getUserStories());
  // }, [dispatch]);

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket(ticketData));
    setTicketData({ title: '', description: '', status: 'Activo', story_id: '' });
  };

  return (
    <Container>
      <Typography variant="h5">Crear Ticket</Typography>
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
        <Select
          name="story_id"
          value={ticketData.story_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {userStories.map((story) => (
            <MenuItem key={story.id} value={story.id}>
              {story.title}
            </MenuItem>
          ))}
        </Select>
        <Button type="submit" variant="contained" color="primary">
          Crear Ticket
        </Button>
      </form>
    </Container>
  );
};

export default CreateTicketPage;

