import React, { ReactNode } from 'react';

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
export const VarCategory = ({
  label,
  className,
  children,
}: IVarCategoryProps): JSX.Element => {
  return (
    <div className={'react-var-ui-category ' + (className ? className : '')}>
      <div className="react-var-ui-category-title">{label}</div>
      {!!children && <div>{children}</div>}
    </div>
  );
};
