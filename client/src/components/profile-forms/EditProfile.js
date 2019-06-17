import React, { useState, Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    tipe: '',
    name: '',
    displayPicture: '',
    website: '',
    location: '',
    bio: '',
    genre: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      tipe: loading || !profile.tipe ? '' : profile.tipe,
      name: loading || !profile.name ? '' : profile.name,
      displayPicture:
        loading || !profile.displayPicture ? '' : profile.displayPicture,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      bio: loading || !profile.bio ? '' : profile.bio,
      genre: loading || !profile.genre ? '' : profile.genre.join(','),
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      instagram: loading || !profile.instagram ? '' : profile.instagram
    });
  }, [loading, getCurrentProfile]);

  const {
    tipe,
    name,
    displayPicture,
    website,
    location,
    bio,
    genre,
    youtube,
    twitter,
    facebook,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Buat Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Buat Profilmu agar semua tahu
      </p>
      <small>* harus diisi</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='tipe' value={tipe} onChange={e => onChange(e)}>
            <option value='0'>* Pilih Tipe Profilmu</option>
            <option value='Band'>Musisi</option>
            <option value='Venue'>Venue</option>
          </select>
          <small className='form-text'>
            *pilih kamu mendaftar sebagai musisi atau venue
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Nama'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            *bisa nama panggung,band atau nama venue
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            website yang dapat dikunjungi selain sosial media
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Lokasi'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Lokasi</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Genre'
            name='genre'
            value={genre}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            gunakan koma (eg. Rock,Jazz,Blues) isi dengan aliran yang dimainkan
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Display Picture URL'
            name='displayPicture'
            value={displayPicture}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>link foto band/venue</small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            sampaikan kepada semua tentang dirimu
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            tambahkan link sosial media
          </button>
          <span>Optional</span>
        </div>
        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
