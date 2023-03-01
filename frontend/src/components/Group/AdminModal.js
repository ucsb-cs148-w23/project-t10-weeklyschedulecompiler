export default function AdminModal() {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove {del_user}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to remove {del_user}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            handleClose();
            deleteGroupMember(deleteUrl, { email, userId: user.user.id });
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
