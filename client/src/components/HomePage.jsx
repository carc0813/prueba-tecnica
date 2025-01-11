import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies, getProjects, getTickets } from '../redux/actions';
import { Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';



const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getProjects());
    dispatch(getTickets());
  }, [dispatch]);

  // Selección de datos del estado global
  const companies = useSelector((state) => state.companies.companies);
  const projects = useSelector((state) => state.projects.projects);
  const tickets = useSelector((state) => state.tickets.tickets);

  // Control de carga
  const isLoading = !companies.length || !projects.length || !tickets.length;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Companies
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        companies.map((company) => (
          <Card key={company.id} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{company.name}</Typography>
              <Typography variant="body2">Email: {company.email}</Typography>
              <Typography variant="body2">Phone: {company.phone}</Typography>
              <Typography variant="body2">Address: {company.address}</Typography>

              <Box mt={2}>
                <Typography variant="subtitle1">Projects:</Typography>
                {projects
                  .filter((project) => project.companyId === company.id)
                  .map((project) => (
                    <Box key={project.id} ml={2} mt={1}>
                      <Typography variant="body1">{project.name}</Typography>
                      <Typography variant="body2">{project.description}</Typography>

                      <Box mt={1}>
                        <Typography variant="subtitle2">Tickets:</Typography>
                        {tickets
                          .filter((ticket) => ticket.projectId === project.id)
                          .map((ticket) => (
                            <Typography key={ticket.id} variant="body2">
                              - {ticket.title} ({ticket.status})
                            </Typography>
                          ))}
                      </Box>
                    </Box>
                  ))}
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </div>
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
