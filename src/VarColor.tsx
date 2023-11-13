import React, { useCallback, useState } from 'react';
import { SketchPicker } from 'react-color';

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
  className,
}: IVarColorProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(show => !show), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span>
        <span className="react-var-ui-color-value">{currentValue}</span>
        <div className="react-var-ui-color">
          <div className="react-var-ui-color-swatch" onClick={toggle}>
            <div
              className="react-var-ui-color-color"
              title="Color preview"
              style={{ background: currentValue }}
            />
          </div>
          {show ? (
            <div className="react-var-ui-color-popover">
              <div className="react-var-ui-color-cover" onClick={close} />
              <SketchPicker
                color={currentValue}
                onChange={result => {
                  // A workaround for some really "interesting" design decisions in react-color.
                  // https://github.com/casesandberg/react-color/blob/bc9a0e1dc5d11b06c511a8e02a95bd85c7129f4b/src/helpers/color.js#L39
                  const hex =
                    result.hex === 'transparent' ? '#000000' : result.hex;
                  if (alpha) {
                    let alphaValue = Math.round(
                      (result.rgb.a ?? 1.0) * 255
                    ).toString(16);
                    if (alphaValue.length === 1) {
                      alphaValue = '0' + alphaValue;
                    }
                    setCurrentValue(hex + alphaValue);
                  } else {
                    setCurrentValue(hex);
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
