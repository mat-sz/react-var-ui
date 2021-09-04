import React from 'react';
import { render } from '@testing-library/react';

import { useVarUIValue, VarUIContext } from '../../src/common/VarUIContext';

describe('VarUIContext', () => {
  it('calls context functions', () => {
    const values = {};
    const getValue = jest.fn(() => 1);
    const setValue = jest.fn();
    const context = {
      values,
      getValue,
      setValue
    };

    const Component = () => {
      const [currentValue, setCurrentValue] = useVarUIValue('test');
      expect(currentValue).toBe(1);
      setCurrentValue(2);
      return <></>;
    };

    render(
      <VarUIContext.Provider value={context}>
        <Component />
      </VarUIContext.Provider>
    );

    expect(getValue).toBeCalledWith('test');
    expect(setValue).toBeCalledWith('test', 2);
  });

  it('uses fallback value', () => {
    const values = {};
    const getValue = jest.fn(() => undefined);
    const setValue = jest.fn();
    const context = {
      values,
      getValue,
      setValue
    };

    const Component = () => {
      const [currentValue] = useVarUIValue('test', 1);
      expect(currentValue).toBe(1);
      return <></>;
    };

    render(
      <VarUIContext.Provider value={context}>
        <Component />
      </VarUIContext.Provider>
    );

    expect(getValue).toBeCalledWith('test');
  });

  it('calls onChange', () => {
    const values = {};
    const getValue = jest.fn(() => undefined);
    const setValue = jest.fn();
    const onChange = jest.fn();
    const context = {
      values,
      getValue,
      setValue
    };

    const Component = () => {
      const [, setCurrentValue] = useVarUIValue('test', undefined, onChange);
      setCurrentValue(2);
      return <></>;
    };

    render(
      <VarUIContext.Provider value={context}>
        <Component />
      </VarUIContext.Provider>
    );

    expect(setValue).toBeCalledWith('test', 2);
    expect(onChange).toBeCalledWith(2);
  });
});
