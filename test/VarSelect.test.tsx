import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VarSelect } from '../src/VarSelect';

describe('VarSelect', () => {
  it('renders without crashing', () => {
    render(<VarSelect options={[]} />);
  });

  it('value: displayed', async () => {
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1' },
          { key: 2, label: 'Test 2' },
          { key: 3, label: 'Test 3' }
        ]}
        value={2}
      />
    );
    const value = await screen.findAllByDisplayValue('Test 2');
    expect(value).toBeTruthy();
  });

  it('value: displayed (value property)', async () => {
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1', value: 'test1' },
          { key: 2, label: 'Test 2', value: 'test2' },
          { key: 3, label: 'Test 3', value: 'test3' }
        ]}
        value="test2"
      />
    );
    const value = await screen.findAllByDisplayValue('Test 2');
    expect(value).toBeTruthy();
  });

  it('value: changed', async () => {
    const fn = jest.fn();
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1' },
          { key: 2, label: 'Test 2' },
          { key: 3, label: 'Test 3' }
        ]}
        value={2}
        onChange={fn}
      />
    );
    const select = await screen.findByTitle('Select options');
    userEvent.selectOptions(select, '1');
    expect(fn).toBeCalledWith(1);
  });

  it('value: changed (value property)', async () => {
    const fn = jest.fn();
    render(
      <VarSelect
        options={[
          { key: 1, label: 'Test 1', value: 'test1' },
          { key: 2, label: 'Test 2', value: 'test2' },
          { key: 3, label: 'Test 3', value: 'test3' }
        ]}
        value="test2"
        onChange={fn}
      />
    );
    const select = await screen.findByTitle('Select options');
    userEvent.selectOptions(select, '"test1"');
    expect(fn).toBeCalledWith('test1');
  });
});
