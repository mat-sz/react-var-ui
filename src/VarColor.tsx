import React, { FC, useCallback, useState } from 'react';
import { SketchPicker } from 'react-color';

import { useVarUIValue } from './VarUI';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarColorProps extends IVarBaseInputProps<string> {}

export const VarColor: FC<IVarColorProps> = ({
  label,
  path,
  value,
  onChange
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow(show => !show), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);

  return (
    <VarBase label={label}>
      <span className="react-var-ui-color-value">{currentValue}</span>
      <div className="react-var-ui-color">
        <div className="react-var-ui-color-swatch" onClick={toggle}>
          <div
            className="react-var-ui-color-color"
            style={{ background: currentValue }}
          />
        </div>
        {show ? (
          <div className="react-var-ui-color-popover">
            <div className="react-var-ui-color-cover" onClick={close} />
            <SketchPicker
              color={currentValue}
              onChange={result => setCurrentValue(result.hex)}
            />
          </div>
        ) : null}
      </div>
    </VarBase>
  );
};
