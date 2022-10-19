import React from 'react';
import './App.css';
import ProviderTable from './context/ProviderTable';
import Table from './component/Table';

function App() {
  return (
    <ProviderTable>
      <h1>Projeto Star Wars</h1>
      <Table />
    </ProviderTable>
  );
}

export default App;
