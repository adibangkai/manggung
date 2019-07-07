import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Maaf boss,
      </h1>
      <p className='large'>Kamu salah panggung, cek Lagi ya</p>
    </Fragment>
  );
};

export default NotFound;
