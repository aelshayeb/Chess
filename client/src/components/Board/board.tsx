import React from 'react';
import { connect } from 'react-redux';

import { positionToString } from '../../helpers/positionHelper';
import BoardSquare from '../BoardSquare';
import Knight from '../Knight';
import { getPositionRequest } from '../../redux/api/actions';
import './styles.scss';

interface IProps {
  first: string[];
  second: string[];
  getPosition: Function;
}

interface IState {
  posX: number;
  posY: number;
}

class Board extends React.Component<IProps, IState> {
  state = {
    posX: -1,
    posY: -1,
  };

  isOverlay = (x: number, y: number) => {
    const { first } = this.props;
    const { posX, posY } = this.state;

    if (posX === -1 || posY === -1) return false;
    if (typeof first === 'undefined') return false;

    return first.includes(positionToString(x, y));
  };

  isSecondOverlay = (x: number, y: number) => {
    const { second } = this.props;
    const { posX, posY } = this.state;

    if (posX === -1 || posY === -1) return false;
    if (typeof second === 'undefined') return false;

    return second.includes(positionToString(x, y));
  }

  onHandleClick = (x: number, y: number) => {
    const { getPosition, first: availablePositions } = this.props;
    const { posX, posY } = this.state;

    if (
      (posX === -1 && posY === -1) ||
      availablePositions.includes(positionToString(x, y))
    ) {
      this.setState({
        posX: x,
        posY: y,
      });

      getPosition({
        pos: positionToString(x, y),
      });
    }
  };

  renderPiece = (x: number, y: number) => {
    const { posX, posY } = this.state;

    if (x === posX && y === posY) {
      return <Knight />;
    }
  };

  renderSquare = (index: number) => {
    const x = index % 8;
    const y = Math.floor(index / 8);

    return (
      <div
        key={index}
        className="square"
        onClick={() => this.onHandleClick(x, y)}
      >
        <BoardSquare
          posX={x}
          posY={y}
          isOverlay={this.isOverlay(x, y)}
          isSecondOverlay={this.isSecondOverlay(x,y)}
        >
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  };

  render() {
    const squares = [];
    for (let i = 0; i < 64; i += 1) squares.push(this.renderSquare(i));

    return (
      <div className="container">
        <div className="boardSquare">{squares}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  first: state.Api.data.first,
  second: state.Api.data.second,
});

const mapDispatchToProps = {
  getPosition: getPositionRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
