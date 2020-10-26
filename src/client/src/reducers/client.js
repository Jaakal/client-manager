import {
  GET_CLIENTS,
  SET_CLIENT_TO_UPDATE,
  ADD_CLIENT,
  UPDATE_CLIENT,
  DELETE_CLIENT,
  GET_CLIENT_TABLE_SIZE,
  SET_PAGINATION_STEP,
  RESET_CLIENT,
  RESET_DATABASE_UPDATED,
  OPEN_FORM,
  CLOSE_FORM,
  FORM_CLOSED,
  END_LOADER_ANIMATION,
  CLIENT_ERROR,
} from '../actions/types';

const initialState = {
  clients: undefined,
  client: undefined,
  clientTableSize: undefined,
  paginationMaxStep: 20,
  paginationStep: 5,
  paginationPosition: 0,
  databaseUpdated: undefined,
  formOpened: false,
  formCloseTriggered: false,
  loaderAnimation: true,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENTS: {
      const { clientTableSize, paginationStep } = state;

      return {
        ...state,
        clients: payload.clients,
        paginationPosition:
          paginationStep *
          Math.floor(
            Math.min(clientTableSize, payload.paginationPosition) /
              paginationStep
          ),
        loading: false,
      };
    }
    case SET_CLIENT_TO_UPDATE:
      return {
        ...state,
        client: payload,
      };
    case ADD_CLIENT:
    case UPDATE_CLIENT:
    case DELETE_CLIENT:
      return {
        ...state,
        client: undefined,
        databaseUpdated: true,
      };
    case GET_CLIENT_TABLE_SIZE:
      return {
        ...state,
        clientTableSize: payload,
      };
    case SET_PAGINATION_STEP: {
      const { paginationPosition } = state;

      return {
        ...state,
        paginationStep: payload,
        paginationPosition: payload * Math.floor(paginationPosition / payload),
      };
    }
    case RESET_CLIENT:
      return {
        ...state,
        client: undefined,
      };
    case RESET_DATABASE_UPDATED:
      return {
        ...state,
        databaseUpdated: undefined,
      };
    case OPEN_FORM:
      return {
        ...state,
        formOpened: true,
      };
    case CLOSE_FORM:
      return {
        ...state,
        formCloseTriggered: true,
      };
    case FORM_CLOSED:
      return {
        ...state,
        formOpened: false,
        formCloseTriggered: false,
      };
    case END_LOADER_ANIMATION:
      return {
        ...state,
        loaderAnimation: false,
      };
    case CLIENT_ERROR:
      return {
        ...state,
        databaseUpdated: false,
      };
    default:
      return {
        ...state,
      };
  }
};
