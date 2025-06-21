import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';

const Home = () => {
  const isError = false;
  ExchangeForm;

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
        <ExchangeForm></ExchangeForm>
      </Container>
    </Section>
  );
};

export default Home;
