import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { gsap } from 'gsap';

import {
  getClients,
  setPaginationStep,
  openClientForm,
} from '../actions/client';

import '../css/Footer.css';

const Footer = ({
  client: {
    paginationMaxStep,
    paginationStep,
    paginationPosition,
    clientTableSize,
    clients,
    loaderAnimation,
  },
  getClients,
  setPaginationStep,
  openClientForm,
}) => {
  const [pageControlsValues, setPageControlValues] = useState({
    left: false,
    right: false,
    firstNumber: undefined,
    secondNumber: undefined,
    thirdNumber: undefined,
  });

  const calculatePageControls = useCallback(() => {
    let tempLeftControl = false,
      tempRightControl = false,
      tempFirstNumber = clientTableSize > 0 ? 1 : undefined,
      tempSecondNumber = undefined,
      tempThirdNumber = undefined;

    if (paginationPosition !== 0) tempLeftControl = true;

    if (paginationPosition + paginationStep < clientTableSize)
      tempRightControl = true;

    if (Math.ceil(clientTableSize / paginationStep) === 3) {
      tempSecondNumber = 2;
      tempThirdNumber = 3;
    } else if (
      paginationPosition === 0 &&
      paginationPosition + paginationStep < clientTableSize
    ) {
      tempSecondNumber = Math.ceil(clientTableSize / paginationStep);
    } else if (paginationPosition + paginationStep + 1 <= clientTableSize) {
      tempSecondNumber = Math.floor(paginationPosition / paginationStep) + 1;
      tempThirdNumber = Math.ceil(clientTableSize / paginationStep);
    } else {
      tempSecondNumber = Math.ceil(clientTableSize / paginationStep);
    }

    setPageControlValues({
      leftControl: tempLeftControl,
      rightControl: tempRightControl,
      firstNumber: tempFirstNumber,
      secondNumber: tempSecondNumber,
      thirdNumber: tempThirdNumber,
    });
  }, [
    paginationStep,
    paginationPosition,
    clientTableSize,
    setPageControlValues,
  ]);

  const handlePageControlClick = (event) => {
    switch (event.target.id) {
      case 'left-control':
        getClients(paginationPosition - paginationStep, paginationPosition);
        break;
      case 'right-control':
        getClients(
          paginationPosition + paginationStep,
          paginationPosition + 2 * paginationStep
        );
        break;
      case 'first-number':
        getClients(0, paginationStep);
        break;
      case 'second-number':
        getClients(
          pageControlsValues.secondNumber * paginationStep - paginationStep,
          pageControlsValues.secondNumber * paginationStep
        );
        break;
      case 'third-number':
        getClients(
          pageControlsValues.thirdNumber * paginationStep - paginationStep,
          pageControlsValues.thirdNumber * paginationStep
        );
        break;
      case 'choose-pagination-variable':
        const newPaginationStep = parseInt(event.target.value, 10);
        const newPaginationPosition =
          paginationPosition + newPaginationStep > clientTableSize
            ? Math.floor(clientTableSize / newPaginationStep) *
              newPaginationStep
            : paginationPosition;

        getClients(
          newPaginationPosition,
          newPaginationPosition + newPaginationStep
        );
        setPaginationStep(newPaginationStep);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      paginationMaxStep !== undefined &&
      paginationStep !== undefined &&
      paginationPosition !== undefined &&
      clientTableSize !== undefined
    ) {
      calculatePageControls();
    }
  }, [
    paginationMaxStep,
    paginationStep,
    paginationPosition,
    clientTableSize,
    calculatePageControls,
  ]);

  useEffect(() => {
    if (
      paginationMaxStep !== undefined &&
      paginationStep !== undefined &&
      paginationPosition !== undefined &&
      clientTableSize !== undefined &&
      clients &&
      !loaderAnimation
    ) {
      const footer = document.querySelector('.footer-wrapper');

      if (window.getComputedStyle(footer).visibility === 'hidden')
        gsap.from(footer, {
          rotationX: 75,
          transformOrigin: '50% 50% 200',
          autoAlpha: 0,
          duration: 1.6,
          delay: 1.8,
          ease: 'power1',
        });
    }
  }, [
    paginationMaxStep,
    paginationStep,
    paginationPosition,
    clientTableSize,
    clients,
    loaderAnimation,
  ]);

  const createPaginationSelectBoxElements = () => {
    const elements = [];

    for (let i = 0; i < paginationMaxStep; i += 1)
      elements.push(<option key={uuidv4()}>{i + 1}</option>);

    return elements;
  };

  return (
    <>
      {clients && !loaderAnimation && (
        <div className='footer-container'>
          <div className='footer-wrapper'>
            <div className='footer-inner-wrapper'>
              <div className='pagination-wrapper'>
                {paginationStep !== undefined &&
                  paginationMaxStep !== undefined &&
                  paginationPosition !== undefined &&
                  clientTableSize !== undefined && (
                    <div className='page-controls'>
                      <div
                        id='left-control'
                        className={`pagination-control-button${
                          pageControlsValues.leftControl ? '' : ' disabled'
                        }`}
                        onClick={handlePageControlClick}
                      >
                        <div className='arrow arrow-left' />
                      </div>
                      <div
                        id='first-number'
                        className={`pagination-control-button first-number${
                          pageControlsValues.firstNumber === undefined
                            ? ' page-number-hidden'
                            : paginationPosition === 0
                            ? ' active'
                            : ''
                        }`}
                        onClick={handlePageControlClick}
                      >
                        {pageControlsValues.firstNumber}
                      </div>
                      <div
                        className={`dots${
                          pageControlsValues.secondNumber &&
                          pageControlsValues.secondNumber -
                            pageControlsValues.firstNumber !==
                            1
                            ? ''
                            : ' dots-hidden'
                        }`}
                      >
                        ...
                      </div>
                      <div
                        id='second-number'
                        className={`pagination-control-button second-number${
                          !pageControlsValues.secondNumber
                            ? ' page-number-hidden'
                            : paginationPosition / paginationStep + 1 ===
                              pageControlsValues.secondNumber
                            ? ' active'
                            : ''
                        }`}
                        onClick={handlePageControlClick}
                      >
                        {pageControlsValues.secondNumber}
                      </div>
                      <div
                        className={`dots${
                          pageControlsValues.thirdNumber &&
                          pageControlsValues.thirdNumber -
                            pageControlsValues.secondNumber !==
                            1
                            ? ''
                            : ' dots-hidden'
                        }`}
                      >
                        ...
                      </div>
                      <div
                        id='third-number'
                        className={`pagination-control-button third-number${
                          !pageControlsValues.thirdNumber
                            ? ' page-number-hidden'
                            : Math.ceil(clientTableSize / paginationPosition) +
                                1 ===
                              pageControlsValues.thirdNumber
                            ? ' active'
                            : ''
                        }`}
                        onClick={handlePageControlClick}
                      >
                        {pageControlsValues.thirdNumber}
                      </div>
                      <div
                        id='right-control'
                        className={`pagination-control-button${
                          pageControlsValues.rightControl ? '' : ' disabled'
                        }`}
                        onClick={handlePageControlClick}
                      >
                        <div className='arrow arrow-right' />
                      </div>
                    </div>
                  )}
                <div className='select-wrapper'>
                  <select
                    id='choose-pagination-variable'
                    value={paginationStep}
                    onChange={handlePageControlClick}
                  >
                    {createPaginationSelectBoxElements()}
                  </select>
                  <div className='arrow-wrapper'>
                    <div className='arrow arrow-down' />
                  </div>
                </div>
              </div>
              <button
                className='toggle-add-new-client'
                onClick={openClientForm}
              >
                Add New Client
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Footer.propTypes = {
  client: PropTypes.object.isRequired,
  getClients: PropTypes.func.isRequired,
  setPaginationStep: PropTypes.func.isRequired,
  openClientForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, {
  getClients,
  setPaginationStep,
  openClientForm,
})(Footer);
