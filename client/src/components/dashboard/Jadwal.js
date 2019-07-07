import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteJadwal } from '../../actions/profile';

const Jadwal = ({ jadwal, deleteJadwal }) => {
  const jadwals = jadwal.map(exp => (
    <tr key={exp._id}>
      <td>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{moment.utc(exp.tanggal)}</Moment> -{' '}
      </td>
      <td>
        <button
          onClick={() => deleteJadwal(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Jadwal Manggung</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Acara</th>
            <th className='hide-sm'>tanggal</th>
            <th />
          </tr>
        </thead>
        <tbody>{jadwals}</tbody>
      </table>
    </Fragment>
  );
};

Jadwal.propTypes = {
  jadwal: PropTypes.array.isRequired,
  deleteJadwal: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteJadwal }
)(Jadwal);
