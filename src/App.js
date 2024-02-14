// App.js
import React, { useState } from 'react';
import './App.scss';
import TableUsers from './components/TableUser';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import ModalAddNew from './components/ModalAddNew';

function App() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Container fluid>
      <div className='app-container'>
        <Container>
          <Header />
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span>List Users:</span>
            <button type="button" className="btn btn-success" onClick={toggleModal}>Add New User</button>
          </div>
          <TableUsers />
          <ModalAddNew show={showModal} handleClose={toggleModal} />
        </Container>
      </div>
    </Container>
  );
}

export default App;
