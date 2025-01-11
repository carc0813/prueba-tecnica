import {
  CREATE_COMPANY,
  GET_COMPANIES,
  CREATE_TICKET,
  EDIT_TICKET,
  CANCEL_TICKET,
  GET_TICKETS,
  CREATE_PROJECT,
  GET_PROJECTS,
  LOGIN,
  LOGIN_FAILURE,
  REGISTER,
  REGISTER_FAIL,
} from "./actions";

const initialState = {
  companies: [],
  projects: [],
  tickets: [],
  user: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.payload],
      };
    case GET_COMPANIES:
      return { ...state, companies: action.payload };
    case CREATE_TICKET:
      return { ...state, tickets: [...state.tickets, action.payload] };
    case EDIT_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    case CANCEL_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
      };
    case GET_TICKETS:
      return { ...state, tickets: action.payload };

    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case LOGIN:
        return { ...state, isAuthenticated: true, user: action.payload, error: null };
      case LOGIN_FAILURE:
        return { ...state, isAuthenticated: false, user: null, error: action.payload };
    case REGISTER:
    //  console.log('Acción REGISTER_USER recibida:', action.payload);
      return { ...state,
        user:action.payload,

      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload, // Guardar el mensaje de error
        loading: false,
      };
    default:
      return state;
  }
}
