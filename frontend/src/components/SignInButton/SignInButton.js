import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'react-bootstrap';

function SignInButton() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    scope: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  return <Button onClick={() => login()}>Sign In</Button>;
}

export default SignInButton;
