import {
  SET_ALERT,
  RESET_ALERT_ADDED,
  REMOVE_ALERT,
  ALERT_REMOVED,
} from './types';

import { v4 as uuidv4 } from 'uuid';

// Set a new alert to display
export const setAlert = (message, alertType = 'neutral') => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id },
  });

  setTimeout(() => dispatch(removeAlert(id)), 3000);
};

// Reset alert added after the animation
export const resetAlertAdded = () => (dispatch) =>
  dispatch({
    type: RESET_ALERT_ADDED,
  });

// Remove existing alert
export const removeAlert = (id) => (dispatch) =>
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });

// Remove existing alert
export const alertRemoved = (id) => (dispatch) =>
  dispatch({
    type: ALERT_REMOVED,
    payload: id,
  });
