import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { gsap } from 'gsap';

import { removeAlert, resetAlertAdded, alertRemoved } from '../actions/alert';

import '../css/Alert.css';

const Alert = ({
  alerts: { alerts, alertAdded, alertsToRemoveIndexes, removeAlertTriggered },
  resetAlertAdded,
  removeAlert,
  alertRemoved,
}) => {
  useEffect(() => {
    if (alertAdded) {
      const timeline = gsap.timeline();

      alerts.map((val, index, array) => {
        gsap.set(`#alert-${index}`, { zIndex: 10000 - index });

        if (index !== alerts.length - 1) {
          timeline.from(
            `#alert-${index}`,
            {
              y: -50,
              duration: 0.2,
              ease: 'linear',
            },
            index !== 0 && '<'
          );
        } else {
          timeline.from(
            `#alert-${index}`,
            {
              rotationX: 15,
              transformOrigin: '50% 50% -200',
              opacity: 0,
              duration: 0.2,
              ease: 'linear',
              onComplete: () => resetAlertAdded(),
            },
            '<'
          );
        }

        return val;
      });
    }
  }, [alerts, alertAdded, resetAlertAdded]);

  useEffect(() => {
    if (removeAlertTriggered) {
      const uuid = alertsToRemoveIndexes[alertsToRemoveIndexes.length - 1];

      gsap.to(`div[uuid='${uuid}']`, {
        rotationX: -15,
        transformOrigin: '50% 50% -200',
        opacity: 0,
        duration: 0.2,
        ease: 'linear',
        onComplete: () => alertRemoved(uuid),
      });
    }
  }, [alertsToRemoveIndexes, removeAlertTriggered, alertRemoved]);

  return (
    <div className='alert-container'>
      <div className='alert-wrapper'>
        {alerts.map((alert, index) => (
          <div
            id={`alert-${alerts.length - 1 - index}`}
            uuid={alert.id}
            className={`alert alert-${alert.alertType}`}
            key={alert.id}
          >
            <div
              className='alert-close-button'
              onClick={() => removeAlert(alert.id)}
            >
              <span></span>
              <span></span>
            </div>
            {alert.message}
          </div>
        ))}
      </div>
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.object.isRequired,
  resetAlertAdded: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  alertRemoved: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  resetAlertAdded,
  removeAlert,
  alertRemoved,
})(Alert);
