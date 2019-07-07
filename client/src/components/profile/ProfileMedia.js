import React from 'react';
import PropTypes from 'prop-types';

const ProfileMedia = ({ media: { title, url, mediatype } }) => (
  <div>
    <h3 className='text-dark'>{title}</h3>
    {
      (mediatype = 'video' ? (
        <img className='med' src={url} alt='' />
      ) : (
        <iframe width='420' height='315' src={url} />
      ))
    }
  </div>
);

ProfileMedia.propTypes = {
  media: PropTypes.object.isRequired
};

export default ProfileMedia;
