import React, { ReactNode, useState } from 'react';
import { IconDown } from './icons/IconDown';
import { IconUp } from './icons/IconUp';

export interface IVarCategoryProps {
  /**
   * Category label.
   */
  label: ReactNode;

  /**
   * Additional class names on the wrapping div element.
   */
  className?: string;

  /**
   * Allows the category to be collapsed if true.
   */
  collapsible?: boolean;

  children?: React.ReactNode;
}

/**
 * Category component for grouping inputs.
 */
export const VarCategory = ({
  label,
  className,
  children,
  collapsible,
}: IVarCategoryProps): JSX.Element => {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className={'react-var-ui-category ' + (className ?? '')}>
      <div className="react-var-ui-category-title">
        {label}
        {collapsible && (
          <button
            title={isCollapsed ? 'Expand' : 'Collapse'}
            className="react-var-ui-category-collapse"
            onClick={() => setCollapsed(isCollapsed => !isCollapsed)}
          >
            {isCollapsed ? <IconDown /> : <IconUp />}
          </button>
        )}
      </div>
      {(!collapsible || !isCollapsed) && <div>{children}</div>}
    </div>
  );
};
