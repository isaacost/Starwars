import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import ContextTable from './ContextTable';

function ProviderTable({ children }) {
  const [data, setData] = useState([]);
  const [planeta, setPlaneta] = useState('');

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
  }), [data, planeta]);

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
