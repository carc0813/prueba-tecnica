import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTicket, getTickets } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditTicketPage = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tickets = useSelector((state) => state.tickets);
  const ticket = tickets.find((t) => t.id === ticketId);

  const [updatedTicket, setUpdatedTicket] = useState(ticket || { title: '', description: '' });

  useEffect(() => {
    if (!ticket) dispatch(getTickets());
  }, [ticket, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTicket(ticketId, updatedTicket));
    navigate('/home');
  };

  if (!ticket) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h5">Editar Ticket</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="title"
          value={updatedTicket.title}
          onChange={(e) => setUpdatedTicket({ ...updatedTicket, title: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={updatedTicket.description}
          onChange={(e) => setUpdatedTicket({ ...updatedTicket, description: e.target.value })}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Guardar Cambios
        </Button>
      </form>
    </Container>
  );
};

export default EditTicketPage;
