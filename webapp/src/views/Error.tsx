import { ViewContainer, BodyContainer } from '../components/Containers';
import { Navbar } from '../components/Navbar';

export const Error = () => {
  return (
    <ViewContainer>
      <Navbar />
      <BodyContainer>
        404 Page Not Found
      </BodyContainer>
    </ViewContainer>
  )
}
