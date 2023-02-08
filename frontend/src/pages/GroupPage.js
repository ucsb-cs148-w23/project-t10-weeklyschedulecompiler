import DefaultLayout from '../layouts/DefaultLayout';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddGroupMembersForm from '../components/forms/AddGroupMembersForm';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';

const CLASSNAME = 'd-flex justify-content-center align-items-center';
let nextId = 0;

export default function GroupDetails({ user }) {
  console.log(user);
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [del_email, setDelete] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const path = window.location.pathname;
  let url =
    'http://localhost:8000/api/group' + path.substring(path.lastIndexOf('/'));

  useEffect(() => {
    fetch('http://localhost:8000/check', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      navigate('/');
    });

    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('failed to fetch group details');
      })

      .then((responseJson) => {
        console.log(responseJson.groupMembers);
        setMembers(responseJson.groupMembers);
      });
  }, [edit]);

  return (
    <DefaultLayout className={CLASSNAME}>
      <Container fluid>
        <Row className="mb-3">
          <Col></Col>
          <Col
            xs={6}
            className="d-flex justify-content-center align-items-center mx-auto fs-1"
          >
            Group Details
          </Col>
          <Col>
            <Button
              className="d-flex justify-content-center align-items-center mx-auto"
              onClick={() => {
                setEdit((prevEdit) => !prevEdit);
              }}
            >
              Edit
            </Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col></Col>
          <Col
            xs={6}
            className="d-flex justify-content-center align-items-center mx-auto"
          >
            <div>
              {members.map((member) => (
                <div>
                  {member}{' '}
                  {edit && (
                    <CloseButton
                      onClick={() => {
                        handleShow();
                        setDelete(member);
                      }}
                    ></CloseButton>
                  )}
                </div>
              ))}
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className="d-flex justify-content-center align-items-center mx-auto">
            {edit && <AddGroupMembersForm></AddGroupMembersForm>}
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              setMembers(members.filter((m) => m !== del_email));
            }}
          >
            Delete user
          </Button>
        </Modal.Footer>
      </Modal>
    </DefaultLayout>
  );
}
