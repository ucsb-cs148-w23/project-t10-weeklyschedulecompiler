import React, { useEffect } from 'react';
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
    <><DefaultLayout>
      <h1 className='d-flex justify-content-center align-items-center' style={{fontSize: '500%'}}>Create a Group!</h1>
      <CreateGroupForm user={user}></CreateGroupForm>
    </DefaultLayout><div className='background_padding'></div></>
  );
};

export default CreateGroupPage;