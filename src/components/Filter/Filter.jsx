import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { selectValueFilter } from '../../redux/selectors';
import { changeFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectValueFilter);

  const handleFilterChange = event => {
    dispatch(changeFilter(event.target.value));
  };
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default Filter;
