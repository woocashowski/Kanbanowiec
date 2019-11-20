import React, { Component } from "react";
import "./colors.css";

const colors = [
  "#ff0000",
  "#ccccff",
  "#00ffff",
  "#3333ff",
  "#33cc33",
  "#ff9933"
];

export default class Colors extends Component {
  render() {
    const colorDivStyle = { backgroundColor: this.props.bgColor };
    const containerDivStyle = { top: this.props.top, left: this.props.left };

    return (
      <div className={"colorModal"} style={containerDivStyle}>
        <div className={"colorModal__exit"}>
          <button
            onClick={this.props.closeModal.bind(this)}
            className={"czqOHE"}
          >
            x
          </button>
        </div>
        <div className={"colorModal__header"}>
          <p>
            <b>Current color:</b>
          </p>
          {this.props.bgColor ? (
            <div style={colorDivStyle}></div>
          ) : (
            <p style={{ marginLeft: "10px" }}>none</p>
          )}
        </div>
        <p>Select color:</p>
        <div className={"colorModal__colors"}>
          <div className="row">
            <div
              className="col-4"
              onClick={this.props.changeCardColor.bind(this)}
              style={{ backgroundColor: colors[0] }}
            ></div>
            <div
              className="col-4"
              onClick={this.props.changeCardColor.bind(this)}
              style={{ backgroundColor: colors[1] }}
            ></div>
            <div
              className="col-4"
              onClick={this.props.changeCardColor.bind(this)}
              style={{ backgroundColor: colors[2] }}
            ></div>
          </div>
          <div className="row">
            <div
              className="col-4"
              onClick={this.props.changeCardColor.bind(this)}
              style={{ backgroundColor: colors[3] }}
            ></div>
            <div
              className="col-4"
              onClick={this.props.changeCardColor.bind(this)}
              style={{ backgroundColor: colors[4] }}
            ></div>
            <div
              className="col-4"
              onClick={this.props.changeCardColor.bind(this)}
              style={{ backgroundColor: colors[5] }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
