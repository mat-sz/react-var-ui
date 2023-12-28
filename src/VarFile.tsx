import React, { useCallback } from 'react';
import filesize from 'filesize';

import { useVarUIValue } from './common/VarUIContext';
import { IconUpload } from './icons/IconUpload';
import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarFileProps extends IVarBaseInputProps<File> {
  /**
   * Accepted file types.
   */
  accept?: string;

  /**
   * Show metadata.
   * Default: true.
   */
  displayMetadata?: boolean;
}

/**
 * File input component. Accepts and provides a File instance.
 */
export const VarFile = ({
  label,
  path,
  value,
  onChange,
  disabled,
  readOnly,
  className,
  accept,
  displayMetadata = true,
  error,
  errorPath,
}: IVarFileProps): JSX.Element => {
  const [currentValue, setCurrentValue, currentError] = useVarUIValue({
    path,
    fallbackValue: value,
    onChange,
    error,
    errorPath,
  });

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
    <VarBase
      label={label}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      error={currentError}
    >
      <span className="react-var-ui-file-value">{currentValue?.name}</span>
      <div className="react-var-ui-file react-var-ui-interactive">
        {displayMetadata && !!currentValue && (
          <div className="react-var-ui-file-metadata">
            <div>Size: {filesize(currentValue.size)}</div>
            <div>Type: {currentValue.type || 'unknown'}</div>
          </div>
        )}
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
