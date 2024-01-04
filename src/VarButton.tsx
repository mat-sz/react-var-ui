import React, { ReactNode } from 'react';

import { IVarBaseProps, VarBase } from './VarBase';

export interface IVarButtonProps extends IVarBaseProps {
  /**
   * Called when the button is clicked.
   */
  onClick?: () => void;

  /**
   * Text for the button.
   */
  buttonLabel: ReactNode;

  /**
   * Should the component be disabled.
   */
  disabled?: boolean;
}

/**
 * Button component. Only provides a onClick property.
 */
export const VarButton = ({
  label,
  onClick,
  buttonLabel,
  disabled,
  className,
  error,
}: IVarButtonProps): JSX.Element => {
  return (
    <VarBase
      label={label}
      disabled={disabled}
      className={className}
      error={error}
    >
      <span className="react-var-ui-button">
        <button onClick={() => onClick?.()} disabled={disabled}>
          {buttonLabel}
        </button>
      </span>
    </VarBase>
  );
};
