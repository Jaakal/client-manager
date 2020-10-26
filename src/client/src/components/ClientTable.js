import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { gsap } from 'gsap';

import {
  getClients,
  setClientToUpdate,
  deleteClient,
  getClientTableSize,
  openClientForm,
  closeClientForm,
} from '../actions/client';

import ClientManagerHeadlineAnimation from '../animations/ClientManagerHeadlineAnimation';
import MountbirchLogoAnimation from '../animations/MountbirchLogoAnimation';

import '../css/ClientTable.css';

const ClientTable = ({
  client: {
    clients,
    paginationStep,
    paginationPosition,
    clientTableSize,
    databaseUpdated,
    loaderAnimation,
  },
  getClients,
  setClientToUpdate,
  deleteClient,
  getClientTableSize,
  openClientForm,
  closeClientForm,
}) => {
  const updateHandler = (clientId) => {
    setClientToUpdate(
      clients.filter((client) => client.clientId === clientId)[0]
    );
    openClientForm();
  };

  useEffect(() => {
    if (clientTableSize === undefined) {
      getClientTableSize();
    } else if (clientTableSize > 0 && clients === undefined) {
      getClients(0, paginationStep);
    }
  }, [
    clients,
    paginationStep,
    clientTableSize,
    getClients,
    getClientTableSize,
  ]);

  useEffect(() => {
    if (databaseUpdated) {
      closeClientForm();
      getClientTableSize();
      getClients(paginationPosition, paginationPosition + paginationStep);
    }
  }, [
    paginationStep,
    paginationPosition,
    databaseUpdated,
    getClients,
    getClientTableSize,
    closeClientForm,
  ]);

  useEffect(() => {
    if (clients && !loaderAnimation) {
      const clientTable = document.querySelector('.client-table');

      if (window.getComputedStyle(clientTable).visibility === 'hidden')
        gsap.from(clientTable, {
          rotationX: -10,
          rotationY: -25,
          transformOrigin: '50% 50% -200',
          autoAlpha: 0,
          duration: 1,
          delay: 1,
        });
    }
  }, [clients, loaderAnimation]);

  return (
    <div className='client-table-wrapper'>
      {(!clients || loaderAnimation) && <MountbirchLogoAnimation />}
      {clients && !loaderAnimation && (
        <>
          <ClientManagerHeadlineAnimation />
          <div className='client-table'>
            <div className='client-table-header'>
              <div className='header name'>Name</div>
              <div className='header address'>Address</div>
              <div className='header city'>City</div>
              <div className='header country-code'>Country Code</div>
              <div className='header loan-amount'>Loan Amount</div>
            </div>
            {clients.map((element) => (
              <div className='client-table-row' key={element.clientId}>
                <div className='column name'>{element.name}</div>
                <div className='column address'>{element.address}</div>
                <div className='column city'>{element.city}</div>
                <div className='column country-code'>{element.countryCode}</div>
                <div className='column loan-amount'>
                  {parseFloat(element.loanAmount).toFixed(2)}
                </div>
                <div className='column buttons-wrapper'>
                  <button onClick={() => updateHandler(element.clientId)}>
                    Update
                  </button>
                  <button onClick={() => deleteClient(element.clientId)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ClientTable.propTypes = {
  client: PropTypes.object.isRequired,
  getClients: PropTypes.func.isRequired,
  setClientToUpdate: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  getClientTableSize: PropTypes.func.isRequired,
  openClientForm: PropTypes.func.isRequired,
  closeClientForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  getClients,
  setClientToUpdate,
  deleteClient,
  getClientTableSize,
  openClientForm,
  closeClientForm,
})(ClientTable);
