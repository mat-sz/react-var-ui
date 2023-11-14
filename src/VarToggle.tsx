import React from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarToggleProps extends IVarBaseInputProps<boolean> {}

/**
 * Checkbox/toggle component. Accepts and returns a boolean (true/false).
 */
export const VarToggle = ({
  label,
  path,
  value,
  onChange,
  disabled,
  readOnly,
  className,
}: IVarToggleProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
    >
      <span>
        <label className="react-var-ui-toggle" title="Toggle">
          <input
            type="checkbox"
            checked={currentValue}
            onChange={e => setCurrentValue(e.target.checked)}
            disabled={disabled}
            readOnly={readOnly}
          />
          <span className="react-var-ui-toggle-helper"></span>
        </label>
      </span>
    </VarBase>
  );
};
