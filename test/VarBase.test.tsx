import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarBase } from '../src/VarBase';

describe('VarBase', () => {
  it('renders without crashing', () => {
    render(<VarBase />);
  });

  it('label: displayed', async () => {
    render(<VarBase label="Test" />);
    const base = await screen.findByText('Test');
    expect(base).toBeTruthy();
  });
});
