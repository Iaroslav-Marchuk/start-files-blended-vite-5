import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency } from '../../redux/selectors';
import { setBaseCurrency } from '../../redux/currencySlice';

const SelectRates = () => {
  const baseCurrency = useSelector(selectBaseCurrency);
  const dispatch = useDispatch();

  const handleChange = selectedValue => {
    dispatch(setBaseCurrency(selectedValue.value));
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectRates;
