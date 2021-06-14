import React, { FC } from 'react';

import { useVarUIValue } from './VarUI';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarStringProps extends IVarBaseInputProps<string> {
  maxLength?: number;
}

/**
 * String input component. Accepts and provides a string value.
 */
export const VarString: FC<IVarStringProps> = ({
  label,
  path,
  value,
  onChange,
  maxLength
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <VarBase label={label}>
      <span className="react-var-ui-string">
        <input
          type="text"
          maxLength={maxLength}
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
        />
      </span>
    </VarBase>
  );
};
