import React from 'react';
import Table from './Table.js';
import NavbarTable from './NavbarTable.js';

function TablePage(props) {
  return <div>
    <NavbarTable logout={props.logout}/>
    <Table />
  </div>
}

export default TablePage;
