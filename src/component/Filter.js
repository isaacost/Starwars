import { useContext } from 'react';
import ContextTable from '../context/ContextTable';

function Filter() {
  const { planeta, handlePlaneta } = useContext(ContextTable);
  const { column, handleColumn } = useContext(ContextTable);
  const { comparison, handleComparison } = useContext(ContextTable);
  const { valueFilter, handleValue } = useContext(ContextTable);
  const { handleButtonFilter } = useContext(ContextTable);

  const columns = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  return (
    <div>
      <div>
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          value={ planeta }
          onChange={ handlePlaneta }
        />
      </div>

      <div>
        <select
          value={ column }
          onChange={ handleColumn }
          data-testid="column-filter"
        >
          {
            columns.map((e) => (
              <option key={ e } value={ e }>
                {e}
              </option>
            ))
          }

        </select>
        <select
          value={ comparison }
          onChange={ handleComparison }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          value={ valueFilter }
          onChange={ handleValue }
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ handleButtonFilter }
          data-testid="button-filter"
        >
          Filtar
        </button>
      </div>

    </div>
  );
}

export default Filter;
