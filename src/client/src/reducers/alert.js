import {
  SET_ALERT,
  RESET_ALERT_ADDED,
  REMOVE_ALERT,
  ALERT_REMOVED,
} from '../actions/types';

const initialState = {
  alerts: [],
  alertAdded: false,
  alertsToRemoveIndexes: [],
  removeAlertTriggered: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [payload, ...state.alerts],
        alertAdded: true,
      };
    case RESET_ALERT_ADDED:
      return {
        ...state,
        alertAdded: false,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alertsToRemoveIndexes: [...state.alertsToRemoveIndexes, payload],
        removeAlertTriggered: true,
      };
    case ALERT_REMOVED:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== payload),
        alertsToRemoveIndexes: state.alertsToRemoveIndexes.filter(
          (index) => index !== payload
        ),
        removeAlertTriggered: false,
      };
    default:
      return state;
  }
};
