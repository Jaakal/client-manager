import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { gsap } from 'gsap';

import {
  addClient,
  updateClient,
  resetClient,
  resetDatabaseUpdated,
  closeClientForm,
  clientFormClosed,
} from '../actions/client';
import {
  tooLong,
  isEmpty,
  notAllLetters,
  notANumber,
  isNotUpper,
} from '../utility/formValidator';

import '../css/ClientForm.css';

const ClientForm = ({
  formDataInitialState,
  client: { client, databaseUpdated, formOpened, formCloseTriggered },
  addClient,
  updateClient,
  resetClient,
  resetDatabaseUpdated,
  closeClientForm,
  clientFormClosed,
}) => {
  const [formSubmitDisabled, setFormSubmitDisabled] = useState(false);
  const [formData, setFormData] = useState(formDataInitialState);

  const {
    name,
    address,
    city,
    countryCode,
    loanAmount,
    nameFocused,
    addressFocused,
    cityFocused,
    countryCodeFocused,
    loanAmountFocused,
  } = formData;

  const handleClose = useCallback(() => {
    setFormData(formDataInitialState);
    resetClient();
    closeClientForm();
  }, [setFormData, formDataInitialState, resetClient, closeClientForm]);

  const handleBlur = (event) =>
    setFormData({
      ...formData,
      [`${event.target.name}Focused`]: true,
    });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      [`${event.target.name}Focused`]: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormSubmitDisabled(true);

    if (client) {
      updateClient({
        ...formData,
        loanAmount: parseFloat(loanAmount).toFixed(2),
        clientId: client.clientId,
      });
    } else {
      addClient({
        ...formData,
        loanAmount: parseFloat(loanAmount).toFixed(2),
      });
    }
  };

  useEffect(() => {
    if (client) {
      const { name, address, city, countryCode, loanAmount } = client;

      setFormData({
        name,
        address,
        city,
        countryCode,
        loanAmount,
      });
    } else if (databaseUpdated) {
      setFormData(formDataInitialState);
      handleClose();
      resetDatabaseUpdated();
    }

    setFormSubmitDisabled(false);
  }, [
    client,
    databaseUpdated,
    formDataInitialState,
    handleClose,
    resetDatabaseUpdated,
  ]);

  useEffect(() => {
    if (formCloseTriggered)
      clientFormClosed()

    // if (formOpened && !formCloseTriggered) {
    //   gsap.from('.client-form', {
    //     rotationX: -100,
    //     transformOrigin: '50% 50% -400',
    //     autoAlpha: 0,
    //     duration: 0.5,
    //     ease: 'back',
    //   });
    // } else if (formCloseTriggered) {
    //   gsap.to('.client-form', {
    //     rotationX: 100,
    //     transformOrigin: '50% 50% -400',
    //     opacity: 0,
    //     duration: 0.5,
    //     ease: 'back.in',
    //     onComplete: () => clientFormClosed(),
    //   });
    // }
  }, [formOpened, formCloseTriggered, clientFormClosed]);

  return (
    formOpened && (
      <div className='client-form-container'>
        <form className='client-form' onSubmit={handleSubmit}>
          <div className='form-close-button' onClick={handleClose}>
            <span></span>
            <span></span>
          </div>

          <div
            className={`form-row-wrapper${nameFocused ? ' focused' : ''}${
              isEmpty(name) ? '' : ' initialized'
            }${tooLong(name, 255) || isEmpty(name) ? ' invalid' : ''}`}
          >
            <div className='floating-label name-label'>
              Name
              <span className='error-message'>
                &nbsp;-&nbsp;
                {isEmpty(name)
                  ? `Can't be blank!`
                  : tooLong(name, 255)
                  ? 'Too long!'
                  : ''}
              </span>
            </div>
            <input
              name='name'
              type='text'
              placeholder='John Doe'
              value={name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className='border-bottom-wrapper'>
              <div className='border-bottom static-border-bottom'></div>
              <div className='border-bottom active-border-bottom'></div>
            </div>
          </div>

          <div
            className={`form-row-wrapper${addressFocused ? ' focused' : ''}${
              isEmpty(address) ? '' : ' initialized'
            }${tooLong(address, 255) || isEmpty(address) ? ' invalid' : ''}`}
          >
            <div className='floating-label address-label'>
              Address
              <span className='error-message'>
                &nbsp;-&nbsp;
                {isEmpty(address)
                  ? `Can't be blank!`
                  : tooLong(address, 255)
                  ? 'Too long!'
                  : ''}
              </span>
            </div>
            <input
              name='address'
              type='text'
              placeholder='2818 E Madison St'
              value={address}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className='border-bottom-wrapper'>
              <div className='border-bottom static-border-bottom'></div>
              <div className='border-bottom active-border-bottom'></div>
            </div>
          </div>

          <div
            className={`form-row-wrapper${cityFocused ? ' focused' : ''}${
              isEmpty(city) ? '' : ' initialized'
            }${tooLong(city, 255) || isEmpty(city) ? ' invalid' : ''}`}
          >
            <div className='floating-label city-label'>
              City
              <span className='error-message'>
                &nbsp;-&nbsp;
                {isEmpty(city)
                  ? `Can't be blank!`
                  : tooLong(city, 255)
                  ? 'Too long!'
                  : ''}
              </span>
            </div>
            <input
              name='city'
              type='text'
              placeholder='Seattle'
              value={city}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className='border-bottom-wrapper'>
              <div className='border-bottom static-border-bottom'></div>
              <div className='border-bottom active-border-bottom'></div>
            </div>
          </div>

          <div
            className={`form-row-wrapper${
              countryCodeFocused ? ' focused' : ''
            }${isEmpty(countryCode) ? '' : ' initialized'}${
              tooLong(countryCode, 3) ||
              isEmpty(countryCode) ||
              notAllLetters(countryCode) ||
              isNotUpper(countryCode)
                ? ' invalid'
                : ''
            }`}
          >
            <div className='floating-label country-code-label'>
              Country Code
              <span className='error-message'>
                &nbsp;-&nbsp;
                {tooLong(countryCode, 3)
                  ? 'Too long!'
                  : isEmpty(countryCode)
                  ? `Can't be blank!`
                  : notAllLetters(countryCode)
                  ? 'Letters only!'
                  : isNotUpper(countryCode)
                  ? `Can't be lowercase!`
                  : ''}
              </span>
            </div>
            <input
              name='countryCode'
              type='text'
              placeholder='US'
              value={countryCode}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className='border-bottom-wrapper'>
              <div className='border-bottom static-border-bottom'></div>
              <div className='border-bottom active-border-bottom'></div>
            </div>
          </div>

          <div
            className={`form-row-wrapper${loanAmountFocused ? ' focused' : ''}${
              isEmpty(loanAmount) ? '' : ' initialized'
            }${notANumber(loanAmount) ? ' invalid' : ''}`}
          >
            <div className='floating-label loan-amount-label'>
              Loan Amount
              <span className='error-message'>
                &nbsp;-&nbsp;
                {isEmpty(loanAmount)
                  ? `Can't be blank!`
                  : notANumber(loanAmount)
                  ? 'Must be a number!'
                  : ''}
              </span>
            </div>
            <input
              name='loanAmount'
              type='text'
              placeholder='999.99'
              value={loanAmount}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <div className='border-bottom-wrapper'>
              <div className='border-bottom static-border-bottom'></div>
              <div className='border-bottom active-border-bottom'></div>
            </div>
          </div>

          <input
            type='submit'
            value={`${client ? 'Update' : 'Add'} Client`}
            disabled={formSubmitDisabled}
          />
        </form>
      </div>
    )
  );
};

ClientForm.defaultProps = {
  formDataInitialState: {
    name: '',
    address: '',
    city: '',
    countryCode: '',
    loanAmount: '',
    nameFocused: false,
    addressFocused: false,
    cityFocused: false,
    countryCodeFocused: false,
    loanAmountFocused: false,
  },
};

ClientForm.propTypes = {
  client: PropTypes.object.isRequired,
  addClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired,
  resetClient: PropTypes.func.isRequired,
  resetDatabaseUpdated: PropTypes.func.isRequired,
  closeClientForm: PropTypes.func.isRequired,
  clientFormClosed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  addClient,
  updateClient,
  resetClient,
  resetDatabaseUpdated,
  closeClientForm,
  clientFormClosed,
})(ClientForm);
