import { Container } from './loadingSection.style';

interface LoadingSectionProps {
  message: string
}

export const LoadingSection = (props: LoadingSectionProps) => {
  const { message } = props;
  
  return (
    <Container>
      { message }
    </Container>
  );
}


