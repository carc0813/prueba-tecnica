import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets } from '../redux/actions';
import { List, ListItem, ListItemText, Typography, Divider, Container } from '@mui/material';

const HistorialTicketsPage = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historial de Tickets
      </Typography>
      <List>
        {tickets.map((ticket) => (
          <React.Fragment key={ticket.id}>
            <ListItem>
              <ListItemText
                primary={ticket.title}
                secondary={`Estado: ${ticket.status} | Comentarios: ${ticket.comments || 'N/A'}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default HistorialTicketsPage;
