import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMedia } from '../../actions/profile';

const Media = ({ media, deleteMedia }) => {
  const medias = media.map(med => (
    <tr key={med._id}>
      <td>{med.title}</td>
      <td className='hide-sm'>{med.mediatype}</td>
      <td className='hide-sm'>{med.url}</td>
      <td>
        <button
          onClick={() => deleteMedia(media._id)}
          className='btn btn-danger'
        >
          hapus
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Media List</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Deskripsi</th>
            <th className='hide-sm'>Media</th>
            <th className='hide-sm'>URL</th>
            <th />
          </tr>
        </thead>

        <tbody>{medias}</tbody>
      </table>
    </Fragment>
  );
};

Media.propTypes = {
  media: PropTypes.array.isRequired,
  deleteMedia: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteMedia }
)(Media);
