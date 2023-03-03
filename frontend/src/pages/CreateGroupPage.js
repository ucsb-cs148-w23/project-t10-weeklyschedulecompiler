import React, { useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from '../components/forms/CreateGroupForm';
import DefaultLayout from '../layouts/DefaultLayout';
import { checkUser } from '../lib/fetchUser';
import '../style/DefaultLayout.css';
const CreateGroupPage = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function localCheckUser() {
      const user = await checkUser();
      if (!user.authenticated) navigate('/');
    }
    localCheckUser();
  });

  return (
    <><DefaultLayout header={'Create a Group'}>
      <p><CreateGroupForm user={user}></CreateGroupForm></p>
    </DefaultLayout><div className='background_padding'></div></>
  );
};

export default CreateGroupPage;
