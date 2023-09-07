import React from 'react';
import { render } from '@testing-library/react';

import { useVarUIValue, VarUIContext } from '../../src/common/VarUIContext';

describe('VarUIContext', () => {
  it('calls context functions', () => {
    const values = {};
    const getValue = vi.fn(() => 1);
    const setValue = vi.fn();
    const context = {
      values,
      getValue,
      setValue,
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
    const getValue = vi.fn(() => undefined);
    const setValue = vi.fn();
    const context = {
      values,
      getValue,
      setValue,
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
    const getValue = vi.fn(() => undefined);
    const setValue = vi.fn();
    const onChange = vi.fn();
    const context = {
      values,
      getValue,
      setValue,
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
