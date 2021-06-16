import React, { FC } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarStringProps extends IVarBaseInputProps<string> {
  /**
   * Maximum length of the text.
   */
  maxLength?: number;

  /**
   * Should the field be a textarea?
   */
  multiline?: boolean;
}

/**
 * String input component. Accepts and provides a string value.
 */
export const VarString: FC<IVarStringProps> = ({
  label,
  path,
  value,
  onChange,
  maxLength,
  multiline
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  return (
    <VarBase label={label}>
      {multiline ? (
        <textarea
          className="react-var-ui-string-multiline"
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
        />
      ) : (
        <span className="react-var-ui-string">
          <input
            type="text"
            maxLength={maxLength}
            value={currentValue}
            onChange={e => setCurrentValue(e.target.value)}
          />
        </span>
      )}
    </VarBase>
  );
};
