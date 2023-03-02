<<<<<<< HEAD
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { config } from '../../Constants';

export default function DeleteGroupButton({ groupId }) {

    let url = config.url + '/api/group' + groupId;
    const navigate = useNavigate();

    // Calls Delete Group API and redirects to groups page
    const handleDeleteGroup = () => {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                navigate('/groups');
                return response.json();
            }
            throw new Error('Failed to delete group');
        })
    }

    return (
        <>
            <Button onClick={handleDeleteGroup}>Delete Group</Button>
        </>
    )
}
=======
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { config } from '../../Constants';
import { deleteGroup } from '../../lib/handleGroup';

export default function DeleteGroupButton({ groupId, userId }) {
  let url = config.url + '/api/group' + groupId;
  const navigate = useNavigate();

  // Calls Delete Group API and redirects to groups page
  async function handleDeleteGroup() {
    const response = await deleteGroup(url, { userId });
    if (response?.success) {
      navigate('/groups');
    }
  }

  return (
    <>
      <Button onClick={handleDeleteGroup}>Delete Group</Button>
    </>
  );
}
>>>>>>> 85567808e3ccec01733f37f44ce9a64d4b45f3ef
