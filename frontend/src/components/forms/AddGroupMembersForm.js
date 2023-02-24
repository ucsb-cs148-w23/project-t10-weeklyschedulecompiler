import { useState } from 'react';
import { config } from '../../Constants';
import Alert from 'react-bootstrap/Alert'

const AddGroupMembersForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    const path = window.location.pathname;
    let url = config.url + '/api/group' + path.substring(path.lastIndexOf('/'));
    const memberEmails = { email };

    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(memberEmails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setSuccess(true)
          setError(false)
          return response.json();
        } else {
          setError(true)
          setSuccess(false)
          console.log('hi')
          throw new Error('failed to fetch events');
        }
      })
      .then((responseJson) => {
        console.log(responseJson);
        window.location.reload(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="me-1">New Member Email: </label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {error && ([
        'danger',
      ].map((message) => (
        <Alert key={message} variant={message}>
          Add Member {message}!
        </Alert>
      )))}
    </form>
  );
};

export default AddGroupMembersForm;
