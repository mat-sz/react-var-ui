import React, { FC, ReactChild, ReactNode } from 'react';

export interface IVarBaseProps {
  label: ReactChild;
  className?: string;
  children?: ReactNode;
}

export interface IVarBaseInputProps<T> extends IVarBaseProps {
  path?: string;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export const VarBase: FC<IVarBaseProps> = ({ label, children, className }) => {
  return (
    <label className={'react-var-ui-label ' + (className ? className : '')}>
      <span>{label}</span>
      {children}
    </label>
  );
};
