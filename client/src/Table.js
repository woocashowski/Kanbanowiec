import React from 'react';
import Board from 'react-trello'
const data = require('./defaultData.js');

function HandleDataChange(newData)
{
  console.log("new data Pog");
  console.log(newData);
}

function Table() {
  return <Board editable
    canAddLanes
  editLaneTitle
    data={data}
  onDataChange={HandleDataChange} 
  />
}

export default Table;