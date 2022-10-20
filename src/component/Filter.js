import { useContext } from 'react';
import ContextTable from '../context/ContextTable';

function Filter() {
  const { planeta, handlePlaneta } = useContext(ContextTable);
  const { column, handleColumn } = useContext(ContextTable);
  const { comparison, handleComparison } = useContext(ContextTable);
  const { valueFilter, handleValue } = useContext(ContextTable);
  const { handleButtonFilter } = useContext(ContextTable);
  const { filters, filterSelecionado } = useContext(ContextTable);
  const { excluirTodos, excluirFiltro } = useContext(ContextTable);
  const { optionsFilter } = useContext(ContextTable);
  const { columnSort, handleColumnSort } = useContext(ContextTable);
  const { handleRadioSort, handleSort } = useContext(ContextTable);

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
            filters.map((e) => (
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
      <div>

        {
          filterSelecionado.length > 0
          && (
            <div>
              <p>Filtros Aplicados:</p>
              <button
                type="button"
                data-testid="button-remove-filters"
                onClick={ excluirTodos }
              >
                Excluir todos
              </button>
            </div>
          )
        }

        <div>
          {
            filterSelecionado?.map((e, i) => (
              <div data-testid="filter" key={ i }>
                <p>{`${e.column} ${e.comparison} ${e.value}`}</p>
                <button
                  type="button"
                  onClick={ () => excluirFiltro(e) }
                >
                  X
                </button>

              </div>
            ))
          }
        </div>
      </div>
      <div>
        <select
          data-testid="column-sort"
          value={ columnSort }
          onChange={ handleColumnSort }
        >
          {
            optionsFilter.map((el) => (
              <option key={ el } value={ el }>{el}</option>
            ))
          }
        </select>
        <label htmlFor="column-sort-input-asc">
          Ascendente
          <input
            type="radio"
            name="sort"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ handleRadioSort }
            defaultChecked
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descendente
          <input
            type="radio"
            name="sort"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ handleRadioSort }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default Filter;
