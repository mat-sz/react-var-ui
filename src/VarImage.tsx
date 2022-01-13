import React, { FC, useCallback } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IconUpload } from './icons/IconUpload';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarImageProps extends IVarBaseInputProps<string> {}

/**
 * Image input component. Accepts and provides a blob URL.
 */
export const VarImage: FC<IVarImageProps> = ({
  label,
  path,
  value,
  onChange,
  disabled,
  className,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }

      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCurrentValue(url);
    },
    [setCurrentValue]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span className="react-var-ui-image-value"></span>
      <div className="react-var-ui-image">
        <div
          className="react-var-ui-image-background"
          style={{
            backgroundImage: currentValue
              ? `url('${currentValue}')`
              : undefined,
          }}
          title="Image preview"
        ></div>
        <IconUpload />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          title="Image upload"
        />
      </div>
    </VarBase>
  );
};
