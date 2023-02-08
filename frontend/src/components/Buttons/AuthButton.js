import { Button } from 'react-bootstrap';

export default function AuthButton({ user }) {
  return (
    <>
      {user.authenticated ? (
        <Button href="https://project-t10-schedulecompiler.herokuapp.com/auth/logout">Log out</Button>
      ) : (
        <Button href="https://project-t10-schedulecompiler.herokuapp.com/auth/google">Sign in</Button>
      )}
    </>
  );
}
