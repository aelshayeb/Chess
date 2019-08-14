import React, { ReactNode } from 'react';

import './styles.scss';

interface IProps {
  isBlack: boolean;
  isOverlay: boolean;
  isSecondOverlay: boolean;
  children?: ReactNode;
}

class Square extends React.Component<IProps> {
  render() {
    const { isBlack, isOverlay, isSecondOverlay, children } = this.props;
    const fill = isBlack ? 'black' : 'white';
    const stroke = isBlack ? 'white' : 'black';

    return (
      <div
        className="square"
        style={{
          backgroundColor: isOverlay ? 'red' : isSecondOverlay ? 'blue' : fill,
          opacity: isOverlay || isSecondOverlay ? 0.5 : 1,
          color: stroke,
        }}
      >
        {children}
      </div>
    );
  }
}

export default Square;
