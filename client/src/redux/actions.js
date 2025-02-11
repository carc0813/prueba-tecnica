import axios from 'axios';

// Constantes para los tipos de acciones

export const GET_COMPANIES = 'GET_COMPANIES';
export const CREATE_COMPANY='CREATE_COMPANY'
export const CREATE_TICKET = 'CREATE_TICKET';
export const EDIT_TICKET = 'EDIT_TICKET';
export const CANCEL_TICKET = 'CANCEL_TICKET';
export const GET_TICKETS = 'GET_TICKETS';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILURE='LOGIN_FAILURE'
export const REGISTER = 'REGISTER';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const GET_PROJECTS = 'GET_PROJECTS';
export const  REGISTER_FAIL="REGISTER_FAIL";
export const GET_USER_STORIES = 'GET_USER_STORIES';
export const CREATE_USER_STORY = 'CREATE_USER_STORY';
export const SET_ERROR = 'SET_ERROR';
// Acción para crear una nueva empresa
export const createCompany = (companyData) => {
    return (dispatch) => {
      axios.post('http://localhost:3001/companies', companyData)
        .then(response => {
          dispatch({
            type: CREATE_COMPANY,
            payload: response.data,
          });
        })
        .catch(error => console.error('Error al crear empresa:', error));
    };
  };
  
// Acción para obtener compañías
export function getCompanies() {
    return function (dispatch) {
        axios.get('http://localhost:3001/companies')
            .then((response) => {
                dispatch({
                    type: GET_COMPANIES,
                    payload: response.data,
                });
            })
            .catch((error) => console.error(error));
    };
}

// Acción para registrar usuario
export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/register', userData);
      dispatch({
        type: REGISTER, // Acción que indica que el registro fue exitoso
        payload: response.data,
      });
      return response; // Retornar la respuesta para manejarla en el frontend
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL, // Acción que indica que el registro falló
        payload: error.response ? error.response.data : error.message,
      });
      return Promise.reject(error); // Retornar el error para manejarlo en el frontend
    }
  };
};

// Acción para iniciar sesión
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();
    dispatch({ type: LOGIN, payload: data });
    return true; // Retorna true si el login fue exitoso
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    return false; // Retorna false si hubo un error
  }
};

// Acción para crear un nuevo proyecto
export const createProject = (projectData) => {
    return (dispatch) => {
      axios.post('http://localhost:3001/projects', projectData)
        .then(response => {
          dispatch({
            type: CREATE_PROJECT,
            payload: response.data,
          });
        })
        .catch(error => console.error('Error al crear proyecto:', error));
    };
  };
  
  // Acción para obtener la lista de proyectos
  export const getProjects = () => {
    return (dispatch) => {
      axios.get('http://localhost:3001/projects')
        .then(response => {
          dispatch({
            type: GET_PROJECTS,
            payload: response.data,
          });
        })
        .catch(error => console.error('Error al obtener proyectos:', error));
    };
  };

// Acción para crear un ticket
export function createTicket(ticketData) {
    return function (dispatch) {
        axios.post('http://localhost:3001/tickets', ticketData)
            .then((response) => {
                dispatch({
                    type: CREATE_TICKET,
                    payload: response.data,
                });
            })
            .catch((error) => console.error(error));
    };
}

// Acción para editar un ticket
export function editTicket(ticketId, updates) {
    return function (dispatch) {
        axios.put(`http://localhost:3001/tickets/${ticketId}`, updates)
            .then((response) => {
                dispatch({
                    type: EDIT_TICKET,
                    payload: response.data,
                });
            })
            .catch((error) => console.error(error));
    };
}

// Acción para cancelar un ticket
export function cancelTicket(ticketId) {
    return function (dispatch) {
        axios.delete(`http://localhost:3001/tickets/${ticketId}`)
            .then(() => {
                dispatch({
                    type: CANCEL_TICKET,
                    payload: ticketId,
                });
            })
            .catch((error) => console.error(error));
    };
}

// Acción para obtener todos los tickets
export function getTickets() {
    return function (dispatch) {
        axios.get('http://localhost:3001/tickets')
            .then((response) => {
                dispatch({
                    type: GET_TICKETS,
                    payload: response.data,
                });
            })
            .catch((error) => console.error(error));
    };
}



// Action Creators
export const getUserStories = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/stories');
    dispatch({
      type: GET_USER_STORIES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message,
    });
  }
};

export const createUserStory = (storyData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/stories', storyData);
    dispatch({
      type: CREATE_USER_STORY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message,
    });
  }
};





