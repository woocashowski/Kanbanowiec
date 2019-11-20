import React, { Component } from "react";
import Board from "react-trello";

import Colors from "./../colors/Colors.jsx";

export default class Table extends Component {
  constructor() {
    super();
    this.state = {
      isCardClicked: null,
      currentCardDate: {
        id: undefined,
        x: undefined,
        top: undefined,
        width: undefined,
        bgColor: undefined
      }
    };
  }

  renderModal() {
    const {x, top, width, bgColor} = this.state.currentCardDate;
    return (
      <Colors
        left={x + width}
        top={top}
        bgColor={bgColor}
        closeModal={this.closeModal.bind(this)}
        changeCardColor={this.changeCardColor.bind(this)}
      />
    );
  }

  defaultState(){
    return {
      isCardClicked: null,
      currentCardDate: {
        id: undefined,
        x: undefined,
        top: undefined,
        width: undefined,
        bgColor: undefined
      }
    }
  }

  closeModal(e) {
    this.setState(
      this.defaultState()
    );
  }

  changeCardColor(e) {
    const card = document.querySelector(`[data-id="${this.state.currentCardDate.id}"]`);
    const color = e.target.style.backgroundColor;
    card.style.backgroundColor = color;

    this.props.updateCardColor(this.state.currentCardDate.id, color);

    this.setState(
      this.defaultState()
    );
  }

  onCardClick(cardId, metadata, laneId) {
    const cardDOM = document.querySelector(`[data-id="${cardId}"]`);
    const { x, y: top, width } = cardDOM.getBoundingClientRect();

    this.setState({
      currentCardDate: {
        id: cardId,
        x,
        top,
        width,
        bgColor: cardDOM.style.backgroundColor
      },
      isCardClicked: true,
    });

  }

  onDataChange(newData){
    this.props.changeData(newData);
  }

  onCardAdd(card, laneId){

  }

  onCardDelete(cardId, laneId){

  }

  onLaneAdd(params){

  }

  onLaneDelete(laneId){

  }

  onLaneUpdate(laneId, data) {
  }

  render() {
    return (
      <>
        {this.state.isCardClicked ? this.renderModal() : null}
        <Board
          editable
          canAddLanes
          editLaneTitle
          data={this.props.data}
          onCardClick={this.onCardClick.bind(this)}
          onCardAdd={this.onCardAdd.bind(this)}
          onCardDelete={this.onCardDelete.bind(this)}
          onDataChange={this.onDataChange.bind(this)}
          onLaneAdd={this.onLaneAdd.bind(this)}
          onLaneDelete={this.onLaneDelete.bind(this)}
          onLaneUpdate={this.onLaneUpdate.bind(this)}
        />
      </>
    );
  }
}
