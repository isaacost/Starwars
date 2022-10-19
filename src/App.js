import React from 'react';
import './App.css';
import ProviderTable from './context/ProviderTable';
import Table from './component/Table';
import Filter from './component/Filter';

function App() {
  return (
    <ProviderTable>
      <h1>Projeto Star Wars</h1>
      <Filter />
      <Table />
    </ProviderTable>
  );
}

export default App;
