import React, { CSSProperties, FC, useMemo } from 'react';

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

  /**
   * Should the text field auto expand?
   * Only works with multiline instances.
   */
  autoexpand?: boolean;
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
  multiline,
  autoexpand,
  disabled,
  className,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const autoexpandOnInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = '0';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const textareaStyle: CSSProperties | undefined = useMemo(
    () => (autoexpand ? { overflow: 'hidden', resize: 'none' } : undefined),
    [autoexpand]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      {multiline ? (
        <textarea
          className="react-var-ui-string-multiline"
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
          onInput={autoexpand ? autoexpandOnInput : undefined}
          style={textareaStyle}
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
