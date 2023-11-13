import React from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseProps, VarBase } from './VarBase';

export interface IVarDisplayProps extends IVarBaseProps {
  /**
   * Variable path in the data object.
   */
  path?: string;

  /**
   * Current value (only used if context and path aren't available).
   * In most cases you aren't going to need this.
   */
  value?: string | number;
}

/**
 * A simple component that displays a string or a numeric value.
 */
export const VarDisplay = ({
  label,
  path,
  value,
  disabled,
  className,
}: IVarDisplayProps): JSX.Element => {
  const [currentValue] = useVarUIValue(path, value);

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span>{currentValue}</span>
    </VarBase>
  );
};
