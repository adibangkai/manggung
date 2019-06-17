import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id },
    tipe,
    name,
    displayPicture,
    location,
    genre
  }
}) => {
  return (
    <div className='profile bg-light'>
      <img src={displayPicture} className='round-img' alt='' />
      <div>
        <h2>{name}</h2>
        <p>{tipe}</p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          Lihat Profil
        </Link>
      </div>
      <ul>
        {genre.slice(0, 4).map((genre, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' />
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
