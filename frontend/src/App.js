import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Groups from './components/Group/Groups';
import AppNavbar from './components/Nav/AppNavbar';
import { GroupData } from './test/groups.mock.data';

function App() {
  const [user, setUser] = useState(true);
  return (
    <div className="App">
      <AppNavbar></AppNavbar>
      {user ? ( // Everything on this line and below this comment can be deleted if need be
        <Groups groupData={{ ...GroupData }} />
      ) : (
        <Container>
          <h1>Not logged in</h1>
        </Container>
      )}
      <Button // Note: This button is here just for testing and can be deleted if necessary
        style={{ bottom: '0', right: '0', position: 'fixed' }}
        onClick={() => {
          setUser(!user);
        }}
      >
        Click to change user setting
      </Button>
    </div>
  );
}

export default App;
