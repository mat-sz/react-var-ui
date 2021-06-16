import React, { FC } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarToggleProps extends IVarBaseInputProps<boolean> {}

/**
 * Checkbox/toggle component. Accepts and returns a boolean (true/false).
 */
export const VarToggle: FC<IVarToggleProps> = ({
  label,
  path,
  value,
  onChange
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <VarBase label={label}>
      <span>
        <label className="react-var-ui-toggle">
          <input
            type="checkbox"
            checked={currentValue}
            onChange={e => setCurrentValue(e.target.checked)}
          />
          <span className="react-var-ui-toggle-helper"></span>
        </label>
      </span>
    </VarBase>
  );
};
