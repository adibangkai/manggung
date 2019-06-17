import React from 'react';
import PropTypes from 'prop-types';

const ProfileMedia = ({ media: { title, url, mediatype } }) => (
  <div>
    <h3 className='text-dark'>{title}</h3>
  </div>
);

ProfileMedia.propTypes = {
  media: PropTypes.object.isRequired
};

export default ProfileMedia;
