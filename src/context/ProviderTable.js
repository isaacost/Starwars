import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
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

  const handleColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const handleComparison = ({ target: { value } }) => {
    setComparison(value);
  };

  const handleValue = ({ target: { value } }) => {
    setValeuFilter(value);
  };

  const handleButtonFilter = () => {
    const filterFilters = filters.filter((e) => e !== column);
    setFilters(filterFilters);
    setColumn(filterFilters[0]);
    if (comparison === 'maior que') {
      const filter = data.filter((e) => Number(e[column]) > Number(valueFilter));
      setData(filter);
    }
    if (comparison === 'menor que') {
      const filter = data.filter((e) => Number(e[column]) < Number(valueFilter));
      setData(filter);
    }
    if (comparison === 'igual a') {
      const filter = data.filter((e) => e[column] === valueFilter);
      setData(filter);
    }
  };

  useEffect(() => {
    const requestAPI = async () => {
      const endPoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endPoint);
      const { results } = await response.json();
      const filter = results.filter((element) => delete element.residents);
      setData(filter);
    };
    requestAPI();
  }, []);

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
  }), [data, planeta, column, comparison, valueFilter, filters]);

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
