import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarCategory } from '../src/VarCategory';

describe('VarCategory', () => {
  it('renders without crashing', () => {
    render(<VarCategory label="Test" />);
  });

  it('label: displayed', async () => {
    render(<VarCategory label="Test" />);
    const value = await screen.findByText('Test');
    expect(value).toBeTruthy();
  });
});
