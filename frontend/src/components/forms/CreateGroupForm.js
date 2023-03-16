import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { config } from '../../Constants';

function CreateGroupForm({user}) {
    const navigate = useNavigate();
    const [name, setName] = useState('')

    const createGroup = (e) => {
      e.preventDefault()
      const body = { groupName: name, email: user.user.email, username: user.user.displayName, googleId: user.user.id }

      fetch(config.url+'/api/group', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('failed to create group');
      }).then((responseJson) => {
        navigate('/groups/'+responseJson._id)
      })
    }


    return (
        <Form onSubmit={createGroup} style={{fontSize: "200%", marginTop: "10%", marginLeft: "25%"}}>
          <div>Enter Group Name</div>
          <div>
            <input
                style = {{marginTop: "7%", fontSize:"80%"}}
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
          </div>
          <div>
            <Button style={{marginTop: "10%", fontSize: "70%",marginLeft: "20%"}} type="submit">Submit</Button>
          </div>
        </Form>
      );
  }
  
export default CreateGroupForm;

