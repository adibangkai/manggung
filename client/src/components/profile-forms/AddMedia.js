import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMedia } from '../../actions/profile';

const AddMedia = ({ addMedia, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    mediatype: '',
    url: ''
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { title, mediatype, url } = formData;
  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addMedia(formData, history);
        }}
      >
        <div className='form-group'>
          <select
            name='mediatype'
            value={mediatype}
            onChange={e => onChange(e)}
          >
            <option value='0'>Pilih Tipe Media</option>
            <option value='video'>Video</option>
            <option value='photo'>Foto</option>
          </select>
          <small className='form-text'>apa tipe media video/foto</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Media URL'
            name='url'
            value={url}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <textarea
            name='title'
            cols='30'
            rows='5'
            placeholder='Tulis Deskripsi '
            value={title}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddMedia.propTypes = {
  addMedia: PropTypes.func.isRequired
};

export default connect(
  null,
  { addMedia }
)(AddMedia);
