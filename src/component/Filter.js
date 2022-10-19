import { useContext } from 'react';
import ContextTable from '../context/ContextTable';

function Filter() {
  const { planeta, handlePlaneta } = useContext(ContextTable);

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          type="text"
          name="name-filter"
          id="name-filter"
          data-testid="name-filter"
          value={ planeta }
          onChange={ handlePlaneta }
        />
      </label>
    </div>
  );
}

export default Filter;
