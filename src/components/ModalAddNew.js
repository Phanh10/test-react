// ModalAddNew.js
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../services/UserService';

function ModalAddNew({ show, handleClose }) {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!show) {
      // Reset form when modal is closed
      resetForm();
    }
  }, [show]);

  const handleSaveChanges = async () => {
    if (name.trim() !== '' && job.trim() !== '') {
      try {
        await postCreateUser(name, job);
        setIsSaved(true);
        handleClose();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      alert('Please fill in both name and job fields.');
    }
  };

  const resetForm = () => {
    setName('');
    setJob('');
    setIsSaved(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='body-add-new'>
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Name</label>
              <input type="text" className="form-control" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="jobInput" className="form-label">Job</label>
              <input type="text" className="form-control" id="jobInput" value={job} onChange={(e) => setJob(e.target.value)} />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={isSaved}>
          {isSaved ? 'Saved' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNew;
