import PropTypes from 'prop-types';
import { useEffect, useMemo, useState, useCallback } from 'react';
import ContextTable from './ContextTable';

const optionsFilter = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

function ProviderTable({ children }) {
  const [data, setData] = useState([]);
  const [planeta, setPlaneta] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValeuFilter] = useState(0);
  const [filters, setFilters] = useState(optionsFilter);
  const [column, setColumn] = useState(filters[0]);
  const [filterSelecionado, setFilterSelecionado] = useState([]);
  const [inicial, setInicial] = useState([]);
  const [columnSort, setColumnSort] = useState('population');
  const [radioSort, setRadioSort] = useState('ASC');

  const handleColumnSort = ({ target: { value } }) => {
    setColumnSort(value);
  };

  const handleRadioSort = ({ target: { value } }) => {
    setRadioSort(value);
  };

  const handleColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const handleComparison = ({ target: { value } }) => {
    setComparison(value);
  };

  const handleValue = ({ target: { value } }) => {
    setValeuFilter(value);
  };

  const handleButtonFilter = useCallback(() => {
    const filterFilters = filters.filter((e) => e !== column);
    setFilters(filterFilters);
    setColumn(filterFilters[0]);
    if (comparison === 'maior que') {
      const filter = data.filter((e) => Number(e[column]) > Number(valueFilter));
      setData(filter);
      setFilterSelecionado([...filterSelecionado,
        { column, comparison, value: valueFilter, array: filter }]);
    }
    if (comparison === 'menor que') {
      const filter = data.filter((e) => Number(e[column]) < Number(valueFilter));
      setData(filter);
      setFilterSelecionado([...filterSelecionado,
        { column, comparison, value: valueFilter, array: filter }]);
    }
    if (comparison === 'igual a') {
      const filter = data.filter((e) => e[column] === valueFilter);
      setData(filter);
      setFilterSelecionado([...filterSelecionado,
        { column, comparison, value: valueFilter, array: filter }]);
    }
  }, [column, comparison, data, filterSelecionado, filters, valueFilter]);

  const handleSort = useCallback(() => {
    if (radioSort === 'ASC') {
      const unknowns = [...data].filter((e) => e[columnSort] === 'unknown');
      const knowns = [...data].filter((e) => e[columnSort] !== 'unknown');
      const arrayNumero = knowns
        .sort((a, b) => Number(a[columnSort]) - Number(b[columnSort]));
      setData([...arrayNumero, ...unknowns]);
    }
    if (radioSort === 'DESC') {
      const unknowns = [...data].filter((e) => e[columnSort] === 'unknown');
      const knowns = [...data].filter((e) => e[columnSort] !== 'unknown');
      const arrayNumero = knowns
        .sort((a, b) => Number(b[columnSort]) - Number(a[columnSort]));
      setData([...arrayNumero, ...unknowns]);
    }
  }, [columnSort, radioSort, data]);

  useEffect(() => {
    const requestAPI = async () => {
      const endPoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const filter = results.filter((element) => delete element.residents);
      setData(filter);
      setInicial(filter);
    };
    requestAPI();
  }, []);

  const excluirTodos = useCallback(() => {
    setData(inicial);
    setFilters(optionsFilter);
    setFilterSelecionado([]);
  }, [inicial]);

  const excluirFiltro = useCallback((element) => {
    if (filterSelecionado.length === 1) {
      setData(inicial);
      setFilters(optionsFilter);
      setFilterSelecionado([]);
    }
    if (filterSelecionado.length >= 2) {
      const filter = filterSelecionado.filter((e) => e.column !== element.column);
      setFilterSelecionado(filter);
      setFilters([...filters, element.column]);
      setData(filterSelecionado[filterSelecionado.length - 2].array);
    }
  }, [filterSelecionado, filters, inicial]);

  const handlePlaneta = ({ target: { value } }) => {
    setPlaneta(value);
  };

  const value = useMemo(() => ({
    data,
    planeta,
    handlePlaneta,
    column,
    handleColumn,
    comparison,
    handleComparison,
    valueFilter,
    handleValue,
    handleButtonFilter,
    filters,
    setFilters,
    filterSelecionado,
    setFilterSelecionado,
    excluirTodos,
    excluirFiltro,
    optionsFilter,
    columnSort,
    handleColumnSort,
    radioSort,
    handleRadioSort,
    handleSort,
  }), [data, planeta, column, comparison, valueFilter, filters, filterSelecionado,
    handleButtonFilter, excluirTodos, excluirFiltro, columnSort, radioSort, handleSort]);

  return (
    <ContextTable.Provider value={ value }>
      {children}
    </ContextTable.Provider>
  );
}

ProviderTable.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default ProviderTable;
