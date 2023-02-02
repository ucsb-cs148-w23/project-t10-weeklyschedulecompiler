import { Button } from 'react-bootstrap';

export default function CreateGroupButton() {
  return (
    <Button
      onClick={() => {
        console.log('Navigate to create group');
      }}
    >
      + Create Group
    </Button>
  );
}
