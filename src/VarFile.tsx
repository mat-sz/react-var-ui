import React, { FC, useCallback } from 'react';

import { useVarUIValue } from './common/VarUIContext';
import { IconUpload } from './icons/IconUpload';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarFileProps extends IVarBaseInputProps<File> {
  /**
   * Accepted file types.
   */
  accept?: string;
}

/**
 * File input component. Accepts and provides a File instance.
 */
export const VarFile: FC<IVarFileProps> = ({
  label,
  path,
  value,
  onChange,
  disabled,
  className,
  accept,
}) => {
  const [currentValue, setCurrentValue] = useVarUIValue(path, value, onChange);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) {
        return;
      }

      const file = e.target.files[0];
      setCurrentValue(file);
    },
    [setCurrentValue]
  );

  return (
    <VarBase label={label} disabled={disabled} className={className}>
      <span className="react-var-ui-file-value">{currentValue?.name}</span>
      <div className="react-var-ui-file">
        <IconUpload />
        <input
          type="file"
          accept={accept}
          onChange={onFileChange}
          title="File upload"
        />
      </div>
    </VarBase>
  );
};
