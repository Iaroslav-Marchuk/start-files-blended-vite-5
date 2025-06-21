import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';

import * as Yup from 'yup';
import { fetchExchangeCurrency } from '../../redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import ExchangeInfo from '../ExchangeInfo/ExchangeInfo';
import {
  selectExchangeCurrencyInfo,
  selectIsError,
  selectIsLoading,
} from '../../redux/selectors';

import Heading from '../Heading/Heading';
import Loader from '../Loader/Loader';

const ExchangeForm = () => {
  const schema = Yup.object().shape({
    input: Yup.string()
      .matches(
        /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/,
        'Request format 15 USD in UAH',
      )
      .required('This is a required field'),
  });

  const dispatch = useDispatch();

  const exchangeInfo = useSelector(selectExchangeCurrencyInfo);
  const isError = useSelector(selectIsError);

  const isLoading = useSelector(selectIsLoading);
  const handleSubmit = async event => {
    event.preventDefault();
    const inputData = event.target.input.value.trim();

    try {
      await schema.validate({ input: inputData });
      const [amountStr, from, , to] = inputData.split(' ');
      const parsedValue = {
        amount: Number(amountStr),
        from: from.toUpperCase(),
        to: to.toUpperCase(),
      };
      console.log(parsedValue);
      dispatch(fetchExchangeCurrency(parsedValue));
      event.target.reset();
    } catch (error) {
      error.message;
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button className={styles.button} type="submit">
          <RiExchangeDollarFill className={styles.icon} />
        </button>

        <input
          title="Request format 15 USD in UAH"
          className={styles.input}
          name="input"
        />
      </form>
      {isLoading ? <Loader /> : exchangeInfo && <ExchangeInfo />}

      {isError && (
        <Heading
          error
          title="Something went wrong...😐 Check the data validity and try again!"
        />
      )}
    </>
  );
};

export default ExchangeForm;
