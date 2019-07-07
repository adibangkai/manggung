import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profiles = ({ getProfiles, profile: { profiles, loading }, match }) => {
  useEffect(() => {
    getProfiles(match.params.tipe);
  }, [getProfiles, match.params.tipe]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Cari dan Hubungi Musisi yang
            anda Cari
          </p>
          <Link to='/profiles/:tipe' className='btn btn-light'>
            Band
          </Link>
          <Link to='/profiles/:tipe' className='btn btn-light'>
            Venue
          </Link>
          <Link to='/profiles/:tipe' className='btn btn-light'>
            Penyanyi
          </Link>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>tidak ditemukan</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
