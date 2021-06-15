import React, { FC, ReactNode } from 'react';

export interface IVarCategoryProps {
  /**
   * Category label.
   */
  label: ReactNode;
}

/**
 * Category component for grouping inputs.
 */
export const VarCategory: FC<IVarCategoryProps> = ({ label, children }) => {
  return (
    <div className="react-var-ui-category">
      <div className="react-var-ui-category-title">{label}</div>
      {!!children && <div>{children}</div>}
    </div>
  );
};
