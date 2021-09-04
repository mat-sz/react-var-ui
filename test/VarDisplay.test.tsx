import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarDisplay } from '../src/VarDisplay';

describe('VarDisplay', () => {
  it('renders without crashing', () => {
    render(<VarDisplay />);
  });

  it('value: displayed', async () => {
    render(<VarDisplay value="Value" />);
    const value = await screen.findByText('Value');
    expect(value).toBeTruthy();
  });
});
