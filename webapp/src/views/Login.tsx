import { FullContainer } from '../components/Containers';
import { RouteButton } from '../components/RouteButton';
import { ViewTitle } from '../components/ViewTitle';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  return (
    <FullContainer>
      <RouteButton text='return to dashboard' href='/' />
      <ViewTitle>Login to userauth</ViewTitle>
      <LoginForm />
      <RouteButton text='Create an account instead' href='/register' />
    </FullContainer>
  )
}