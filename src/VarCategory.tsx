import React, { FC, ReactChild } from 'react';

export interface IVarCategoryProps {
  label: ReactChild;
}

export const VarCategory: FC<IVarCategoryProps> = ({ label, children }) => {
  return (
    <div className="react-var-ui-category">
      <div className="react-var-ui-category-title">{label}</div>
      <div>{children}</div>
    </div>
  );
};
