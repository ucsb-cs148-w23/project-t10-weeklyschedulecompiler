import { Button, Form } from "react-bootstrap";
import { useState } from 'react';

function CreateGroupForm({user}) {

    const [name, setName] = useState('')

    const createGroup = (e) => {
      e.preventDefault()
      const body = { name: name, email: user.user.email }

      fetch('http://localhost:8000/api/group', {
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
        console.log(responseJson);
      })
    }


    return (
        <Form onSubmit={createGroup} style={{fontSize: "30px", marginLeft: "600px", marginTop: "25px"}}>
          <label>Enter Group Name</label>
          <div>
            <input
                style = {{marginTop: "15px", fontSize:"25px"}}
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
            />
          </div>
          <div>
            <Button style={{marginTop: "25px", fontSize: "25px"}} type="submit">Submit</Button>
          </div>
        </Form>
      );
  }
  
export default CreateGroupForm;
  

      // <Form onSubmit={createGroup} style={{marginLeft: "100px", fontSize: "30px", marginTop: "100px"}}>
      //   <Form.Group className="mb-3">
      //     <Form.Label style={{marginLeft: "10px", fontSize: "30px"}}>Group Name</Form.Label>
      //     <Form.Control type="text" 
      //     placeholder="Enter Group Name" 
      //     onChange={(e) => setInput(e.target.value)}
      //     style={{fontSize: "20px", marginBottom: "50px"}}
      //     required
      //     />
      //   </Form.Group>
      //   <Button type="submit" style={{fontSize: "30px"}} onClick={() => setSubmittedInput(input)}>Create!</Button>
      // </Form>
