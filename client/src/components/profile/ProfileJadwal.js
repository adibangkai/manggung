import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileJadwal = ({
  jadwal: { title, location, tanggal, description }
}) => (
  <div>
    <p>
      <Moment format='YYYY/MM/DD'>{moment.utc(tanggal)}</Moment>
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Location: </strong> {location}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileJadwal.propTypes = {
  jadwal: PropTypes.object.isRequired
};

export default ProfileJadwal;
