import { FullContainer } from '../components/Containers';
import { RouteButton } from '../components/RouteButton';
import { ViewTitle } from '../components/ViewTitle';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  return (
    <FullContainer>
      <RouteButton text='return to dashboard' href='/' />
      <ViewTitle>Create a new userauth account</ViewTitle>
      <RegisterForm />
      <RouteButton text='Login instead' href='/login' />
    </FullContainer>
  )
}