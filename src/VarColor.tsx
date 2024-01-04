import React, { useCallback, useState } from 'react';
import ColorPicker from '@uiw/react-color-sketch';

import { useVarUIValue } from './common/VarUIContext';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarColorProps extends IVarBaseInputProps<string> {
  /**
   * Should allow picking alpha values?
   * If true, the result hex code will contain extra two characters representing the alpha value, from 00 to FF.
   */
  alpha?: boolean;
}

/**
 * Color picker component. Returns and accepts values in form of hex color strings.
 */
export const VarColor = ({
  label,
  path,
  value,
  onChange,
  alpha,
  disabled,
  readOnly,
  className,
  error,
  errorPath,
}: IVarColorProps): JSX.Element => {
  const [currentValue, setCurrentValue, currentError] = useVarUIValue({
    path,
    fallbackValue: value,
    onChange,
    error,
    errorPath,
  });

  const [show, setShow] = useState(false);

  return (
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      error={currentError}
    >
      <span>
        <span className="react-var-ui-color-value">{currentValue}</span>
        <div className="react-var-ui-color react-var-ui-interactive">
          <div
            className="react-var-ui-color-swatch"
            onClick={() => setShow(show => !show)}
          >
            <div
              className="react-var-ui-color-color"
              title="Color preview"
              style={{ background: currentValue }}
            />
          </div>
          {show ? (
            <div className="react-var-ui-color-popover">
              <div
                className="react-var-ui-color-cover"
                onClick={() => setShow(false)}
              />
              <ColorPicker
                color={currentValue}
                onChange={result => {
                  if (alpha) {
                    setCurrentValue(result.hexa);
                  } else {
                    setCurrentValue(result.hex);
                  }
                }}
                disableAlpha={!alpha}
              />
            </div>
          ) : null}
        </div>
      </span>
    </VarBase>
  );
};
