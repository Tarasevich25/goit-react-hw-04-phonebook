import PropTypes from 'prop-types';
import css from './PhonebookFilter.module.css';

const PhonebookFilter = ({handleChange, filter }) => {
  return (
    <>
      <label className={css.filter}>
        <p>Search contacts by name</p>
        <input
          name="filter"
          onChange={handleChange}
          type="text"
          placeholder="Search contacts by name"
          value={filter}
        />
      </label>
    </>
  );
};


PhonebookFilter.propTypes = {
  handleChange: PropTypes.func,
  filter: PropTypes.string.isRequired,
};

export default PhonebookFilter;