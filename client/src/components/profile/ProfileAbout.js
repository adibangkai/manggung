import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, genre, name } }) => (
  <div className='profile-about bg-dark p-2'>
    <h2 className='text-white'>{name.trim().split(' ')[0]} Memainkan</h2>
    <div className='skills'>
      {genre.map((genres, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check' /> {genres}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
