import React from 'react';
import { render } from '@testing-library/react';

import { useVarUIValue, VarUIContext } from '../../src/common/VarUIContext';

describe('VarUIContext', () => {
  it('should call context functions', () => {
    const values = {};
    const getValue = vi.fn(() => 1);
    const setValue = vi.fn();
    const getError = vi.fn(() => undefined);
    const context = {
      values,
      getValue,
      setValue,
      getError,
    };

    const Component = () => {
      const [currentValue, setCurrentValue] = useVarUIValue({ path: 'test' });
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

  it('should use fallback value', () => {
    const values = {};
    const getValue = vi.fn(() => undefined);
    const setValue = vi.fn();
    const getError = vi.fn(() => undefined);
    const context = {
      values,
      getValue,
      setValue,
      getError,
    };

    const Component = () => {
      const [currentValue] = useVarUIValue({ path: 'test', fallbackValue: 1 });
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

  it('should call onChange', () => {
    const values = {};
    const getValue = vi.fn(() => undefined);
    const setValue = vi.fn();
    const onChange = vi.fn();
    const getError = vi.fn(() => undefined);
    const context = {
      values,
      getValue,
      setValue,
      getError,
    };

    const Component = () => {
      const [, setCurrentValue] = useVarUIValue({ path: 'test', onChange });
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
