import React, { Component } from "react";
import Table from "./../table/Table.jsx";
import NavbarTable from "./../navbar/NavbarTable.jsx";

export default class TablePage extends Component {
  render() {
    return (
      <>
        <NavbarTable email={this.props.email} loggout={this.props.loggout}/>
        <Table changeData={this.props.changeData} updateCardColor={this.props.updateCardColor} data={this.props.data}/>
      </>
    );
  }
}
