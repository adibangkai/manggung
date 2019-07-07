import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileMedia from './ProfileMedia';
import ProfileJadwal from './ProfileJadwal';
import { getProfileById } from '../../actions/profile';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles/Band' className='btn btn-light'>
            Kembali
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Media</h2>
              {profile.media.length > 0 ? (
                <Fragment>
                  {profile.media.map(media => (
                    <ProfileMedia key={media._id} media={media} />
                  ))}
                </Fragment>
              ) : (
                <h4>Tidak Ada</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Jadwal</h2>
              {profile.jadwal.length > 0 ? (
                <Fragment>
                  {profile.jadwal.map(jadwal => (
                    <ProfileJadwal key={jadwal._id} jadwal={jadwal} />
                  ))}
                </Fragment>
              ) : (
                <h4>Tidak Ada</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
