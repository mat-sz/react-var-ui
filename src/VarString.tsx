import React, { CSSProperties, useMemo } from 'react';

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
export const VarString = ({
  label,
  path,
  value,
  onChange,
  maxLength,
  multiline,
  autoexpand,
  disabled,
  readOnly,
  className,
  error,
  errorPath,
}: IVarStringProps): JSX.Element => {
  const [currentValue, setCurrentValue, currentError] = useVarUIValue({
    path,
    fallbackValue: value,
    onChange,
    error,
    errorPath,
  });

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
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      column={multiline}
      error={currentError}
    >
      {multiline ? (
        <textarea
          className="react-var-ui-string-multiline"
          value={currentValue}
          onChange={e => setCurrentValue(e.target.value)}
          onInput={autoexpand ? autoexpandOnInput : undefined}
          style={textareaStyle}
          disabled={disabled}
          readOnly={readOnly}
        />
      ) : (
        <span className="react-var-ui-string">
          <input
            type="text"
            maxLength={maxLength}
            value={currentValue}
            onChange={e => setCurrentValue(e.target.value)}
            disabled={disabled}
            readOnly={readOnly}
          />
        </span>
      )}
    </VarBase>
  );
};
