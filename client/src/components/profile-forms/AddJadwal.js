import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addJadwal } from '../../actions/profile';

const AddJadwal = ({ addJadwal, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    tanggal: '',
    description: ''
  });

  const { title, location, tanggal, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Tambah Jadwal Manggung</h1>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addJadwal(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='*Nama Acara'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Lokasi'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='tanggal'
            value={tanggal}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Deskripsi'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddJadwal.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { addJadwal }
)(withRouter(AddJadwal));
