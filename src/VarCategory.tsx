import React, { FC, ReactNode } from 'react';

export interface IVarCategoryProps {
  /**
   * Category label.
   */
  label: ReactNode;

  /**
   * Additional class names on the wrapping div element.
   */
  className?: string;

  children?: React.ReactNode;
}

/**
 * Category component for grouping inputs.
 */
export const VarCategory: FC<IVarCategoryProps> = ({
  label,
  className,
  children,
}) => {
  return (
    <div className={'react-var-ui-category ' + (className ? className : '')}>
      <div className="react-var-ui-category-title">{label}</div>
      {!!children && <div>{children}</div>}
    </div>
  );
};
