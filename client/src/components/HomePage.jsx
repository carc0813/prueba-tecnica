import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, getUserStories, getTickets  } from '../redux/actions';
import { Container, Typography, Grid, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();

  // Obtener datos del estado
  const projects = useSelector((state) => state.projects);
  const userStories = useSelector((state) => state.userStories);
  const tickets = useSelector((state) => state.tickets);

  // Cargar datos al montar el componente
  useEffect(() => {
    dispatch(getProjects());
    dispatch(getUserStories());
    dispatch(getTickets());
  }, [dispatch]);


  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      {/* Sección de Proyectos */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Proyectos
        </Typography>
        <List>
          {projects.map((project) => (
            <ListItem key={project.id}>
              <ListItemText
                primary={project.name}
                secondary={`Descripción: ${project.description}`}
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" component={Link} to="/create-project">
          Crear Proyecto
        </Button>
      </Paper>

      {/* Sección de Historias de Usuario */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Historias de Usuario
        </Typography>
        <List>
          {userStories.map((story) => (
            <ListItem key={story.id}>
              <ListItemText
                primary={story.title}
                secondary={`Descripción: ${story.description}`}
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" component={Link} to="/create-user-story">
          Crear Historia de Usuario
        </Button>
      </Paper>

      {/* Sección de Tickets */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Tickets
        </Typography>
        <List>
          {tickets.map((ticket) => (
            <ListItem key={ticket.id}>
              <ListItemText
                primary={ticket.title}
                secondary={`Estado: ${ticket.status} | Asociado a: ${ticket.userStoryId}`}
              />
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to={`/edit-ticket/${ticket.id}`}
                style={{ marginLeft: '10px' }}
              >
                Editar
              </Button>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" component={Link} to="/create-ticket">
          Crear Ticket
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/tickets-history"
          style={{ marginLeft: '10px' }}
        >
          Ver Historial
        </Button>
      </Paper>
    </Container>
  );
};

export default HomePage;




// import React from 'react';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Bienvenido a la Página de Inicio</h1>
//     </div>
//   );
// };

// export default HomePage;
