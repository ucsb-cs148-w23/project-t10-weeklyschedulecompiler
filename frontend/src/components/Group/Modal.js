import { deleteGroupMember } from '../../lib/handleGroup';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteModal(props) {
  const email = props.email;
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove {props.del_user}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove {props.del_user}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            props.handleClose();
            deleteGroupMember(props.deleteUrl, { email, userId: props.user });
            setTimeout(() => {
              window.location.reload(false);
            }, 100);
          }}
        >
          Delete user
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
