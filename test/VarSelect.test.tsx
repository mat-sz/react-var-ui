import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarSelect } from '../src/VarSelect';
import { VarUI } from '../src/VarUI';

describe('VarSelect', () => {
  it('should render without crashing', () => {
    render(<VarSelect options={[]} />);
  });

  it('should display value', async () => {
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1' },
          { key: 2, label: 'Test 2' },
          { key: 3, label: 'Test 3' },
        ]}
        value={2}
      />
    );
    const value = await screen.findAllByDisplayValue('Test 2');
    expect(value.length).toBeGreaterThan(0);
  });

  it('should display value (value property)', async () => {
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1', value: 'test1' },
          { key: 2, label: 'Test 2', value: 'test2' },
          { key: 3, label: 'Test 3', value: 'test3' },
        ]}
        value="test2"
      />
    );
    const value = await screen.findAllByDisplayValue('Test 2');
    expect(value.length).toBeGreaterThan(0);
  });

  it('should update value on change', async () => {
    const fn = vi.fn();
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1' },
          { key: 2, label: 'Test 2' },
          { key: 3, label: 'Test 3' },
        ]}
        value={2}
        onChange={fn}
      />
    );
    const select = await screen.findByTitle('Select options');
    fireEvent.change(select, { target: { value: '1' } });
    expect(fn).toBeCalledWith(1);
  });

  it('should update value on change (value property)', async () => {
    const fn = vi.fn();
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1', value: 'test1' },
          { key: 2, label: 'Test 2', value: 'test2' },
          { key: 3, label: 'Test 3', value: 'test3' },
        ]}
        value="test2"
        onChange={fn}
      />
    );
    const select = await screen.findByTitle('Select options');
    fireEvent.change(select, { target: { value: '"test1"' } });
    expect(fn).toBeCalledWith('test1');
  });

  it('should update value in context', async () => {
    const fn = vi.fn();
    const init = {
      value: 2,
    };
    render(
      <VarUI values={init} onChange={fn}>
        <VarSelect
          path="value"
          options={[
            { key: 1, label: 'Test 1' },
            { key: 2, label: 'Test 2' },
            { key: 3, label: 'Test 3' },
          ]}
        />
      </VarUI>
    );
    const select = await screen.findByTitle('Select options');
    fireEvent.change(select, { target: { value: '1' } });
    expect(fn).toBeCalledWith(expect.objectContaining({ value: 1 }));
  });

  it('should render error from property', async () => {
    render(
      <VarSelect
        path="value"
        options={[
          { key: 1, label: 'Test 1' },
          { key: 2, label: 'Test 2' },
          { key: 3, label: 'Test 3' },
        ]}
        error="example error"
      />
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });

  it('should render error from context', async () => {
    render(
      <VarUI
        values={{
          value: false,
        }}
        errors={{ value: 'example error' }}
      >
        <VarSelect
          path="value"
          options={[
            { key: 1, label: 'Test 1' },
            { key: 2, label: 'Test 2' },
            { key: 3, label: 'Test 3' },
          ]}
        />
      </VarUI>
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });
});
