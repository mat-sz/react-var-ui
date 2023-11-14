import React, { ReactNode } from 'react';

export interface IVarBaseProps {
  /**
   * Label to be shown left to the input.
   */
  label?: ReactNode;

  /**
   * Additional class names on the wrapping div element.
   */
  className?: string;

  /**
   * Should the component be disabled.
   */
  disabled?: boolean;

  /**
   * Should the component be read-only.
   */
  readOnly?: boolean;

  /**
   * Children. Only rendered when provided directly to the VarBase component.
   */
  children?: ReactNode;

  /**
   * Should keep children in a column, with every child having a width of 100%.
   */
  column?: boolean;
}

export interface IVarBaseInputProps<T> extends IVarBaseProps {
  /**
   * Variable path in the data object.
   */
  path?: string;

  /**
   * Current value (only used if context and path aren't available).
   * In most cases you aren't going to need this.
   */
  value?: T;

  /**
   * Default value for components that support resetting (on double click for example).
   */
  defaultValue?: T;

  /**
   * On change event, called with the new value if provided.
   * In most cases you aren't going to need this.
   */
  onChange?: (value: T) => void;
}

/**
 * Base VarUI input component. Doesn't do anything besides displaying the label.
 * Used to construct other components from.
 */
export const VarBase = ({
  label,
  children,
  className,
  disabled,
  readOnly,
  column = false,
}: IVarBaseProps): JSX.Element => {
  return (
    <div
      className={
        'react-var-ui-label ' +
        (label
          ? 'react-var-ui-label-has-label '
          : 'react-var-ui-label-no-label ') +
        (disabled ? 'react-var-ui-disabled ' : '') +
        (readOnly ? 'react-var-ui-read-only ' : '') +
        (column ? 'react-var-ui-label-column ' : '') +
        (className ?? '')
      }
    >
      {!!label && <span>{label}</span>}
      {children}
    </div>
  );
};
