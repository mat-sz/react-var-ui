import React, { FC, ReactText } from 'react';

import { IVarBaseProps, VarBase } from './VarBase';

export interface IVarButtonProps extends IVarBaseProps {
  /**
   * Called when the button is clicked.
   */
  onClick?: () => void;

  /**
   * Text for the button.
   */
  buttonLabel: ReactText;
}

/**
 * Button component. Only provides a onClick property.
 */
export const VarButton: FC<IVarButtonProps> = ({
  label,
  onClick,
  buttonLabel
}) => {
  return (
    <VarBase label={label}>
      <span className="react-var-ui-button">
        <button onClick={onClick}>{buttonLabel}</button>
      </span>
    </VarBase>
  );
};
