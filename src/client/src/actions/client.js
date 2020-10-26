import axios from 'axios';

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
} from './types';

import { setAlert } from './alert';

axios.defaults.baseURL = 'http://localhost:8080';

// Get clients from the database by magnitude of pagination step
export const getClients = (startIndex = 0, endIndex = 0) => async (
  dispatch
) => {
  try {
    if (isNaN(startIndex) || isNaN(endIndex)) {
      startIndex = 0;
      endIndex = 0;
    } else if (startIndex < 0) {
      const paginationStep = endIndex - startIndex;
      startIndex = 0;
      endIndex = startIndex + paginationStep;
    }

    const res = await axios.get(`api/clients/${startIndex}/${endIndex}`);
    const data = await res.data;

    dispatch({
      type: GET_CLIENTS,
      payload: { clients: data, paginationPosition: startIndex },
    });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Initialize client in the state in order to update
export const setClientToUpdate = (client) => async (dispatch) =>
  dispatch({
    type: SET_CLIENT_TO_UPDATE,
    payload: client,
  });

// Add new client to the database
export const addClient = (client) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(client);

  try {
    const res = await axios.post('api/clients', body, config);

    dispatch(setAlert('Client Added', 'success'));

    dispatch({
      type: ADD_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert('Server Error', 'danger'));

    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update already existing client in the database
export const updateClient = (client) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(client);

  try {
    const res = await axios.put('api/clients', body, config);

    dispatch(setAlert('Client Updated', 'success'));

    dispatch({
      type: UPDATE_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete client from the database
export const deleteClient = (clientId) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/clients/${clientId}`);

    dispatch(setAlert('Client Deleted!', 'danger'));

    dispatch({
      type: DELETE_CLIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get client table size from the server
export const getClientTableSize = () => async (dispatch) => {
  try {
    const res = await axios.get(`api/clients`);
    const data = await res.data;

    dispatch({
      type: GET_CLIENT_TABLE_SIZE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: CLIENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Set pagination step for the table
export const setPaginationStep = (paginationStep) => async (dispatch) =>
  dispatch({
    type: SET_PAGINATION_STEP,
    payload: paginationStep,
  });

// Remove current client data from the state
export const resetClient = () => (dispatch) =>
  dispatch({
    type: RESET_CLIENT,
  });

// Open input form
export const openClientForm = () => async (dispatch) =>
  dispatch({
    type: OPEN_FORM,
  });

// Close input form
export const closeClientForm = () => async (dispatch) =>
  dispatch({
    type: CLOSE_FORM,
  });

// Input form closed
export const clientFormClosed = () => async (dispatch) =>
  dispatch({
    type: FORM_CLOSED,
  });

// Reset the state for the database updated event
export const resetDatabaseUpdated = () => (dispatch) =>
  dispatch({
    type: RESET_DATABASE_UPDATED,
  });

// Ends the loader animation
export const endLoaderAnimation = () => (dispatch) =>
  dispatch({
    type: END_LOADER_ANIMATION,
  });
