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

  const [updatedTicket, setUpdatedTicket] = useState({
    title: ticket?.title || '',
    description: ticket?.description || '',
    status: ticket?.status || 'Activo', // Campo adicional
    comments: ticket?.comments || '', // Campo adicional
  });

  useEffect(() => {
    if (!ticket) dispatch(getTickets());
  }, [ticket, dispatch]);

  useEffect(() => {
    if (ticket) {
      setUpdatedTicket({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status || 'Activo',
        comments: ticket.comments || '',
      });
    }
  }, [ticket]);

  const handleChange = (e) => {
    setUpdatedTicket({ ...updatedTicket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTicket(ticketId, updatedTicket));
    navigate('/home');
  };

  if (!ticket)
    return (
      <Typography variant="h6" align="center">
        Cargando ticket...
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Editar Ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="title"
          value={updatedTicket.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Descripción"
          name="description"
          value={updatedTicket.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Comentarios"
          name="comments"
          value={updatedTicket.comments}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Estado"
          name="status"
          value={updatedTicket.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Guardar Cambios
        </Button>
      </form>
    </Container>
  );
};

export default EditTicketPage;

