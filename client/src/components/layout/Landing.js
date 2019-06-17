import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ auth: { isAuthenticated, loading } }) => {
  const authLanding = (
    <div className='buttons'>
      <Link to='/#!' className='btn btn-primary'>
        Discover
      </Link>
    </div>
  );
  const guestLanding = (
    <div className='buttons'>
      <Link to='/register' className='btn btn-primary'>
        Sign Up
      </Link>
      <Link to='/login' className='btn btn-light'>
        Login
      </Link>
    </div>
  );
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Manggung</h1>
          <p className='lead'>Cari Panggungmu</p>
          {!loading && (
            <Fragment>{isAuthenticated ? authLanding : guestLanding}</Fragment>
          )}
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
