import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectIsError,
  selectIsLoading,
  selectRates,
} from '../redux/selectors';
import { useEffect } from 'react';
import { fetchActualRates } from '../redux/operations';
import RatesList from '../components/RatesList/RatesList';

const Rates = () => {
  const baseCurrency = useSelector(selectBaseCurrency);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const rates = useSelector(selectRates);

  const filteredRates = rates
    .filter(([key]) => key !== baseCurrency)
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchActualRates());
  }, [dispatch]);

  return (
    <Section>
      <Container>
        {!isLoading && rates.length > 0 && <RatesList rates={filteredRates} />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
