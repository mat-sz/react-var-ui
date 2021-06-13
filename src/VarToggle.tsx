import React, { FC } from 'react';

import { useVarUIValue } from './VarUI';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarToggleProps extends IVarBaseInputProps<boolean> {}

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
        <div className="react-var-ui-toggle">
          <input
            type="checkbox"
            checked={currentValue}
            onChange={e => setCurrentValue(e.target.checked)}
          />
          <span className="react-var-ui-toggle-helper"></span>
        </div>
      </span>
    </VarBase>
  );
};
