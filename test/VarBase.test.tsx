import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarBase } from '../src/VarBase';

describe('VarBase', () => {
  it('should render without crashing', () => {
    render(<VarBase />);
  });

  it('should display label', async () => {
    render(<VarBase label="Test" />);
    const base = await screen.findByText('Test');
    expect(base).toBeInTheDocument();
  });

  it('should render error from property', async () => {
    render(<VarBase error="example error" />);
    expect(screen.getByText('example error')).toBeInTheDocument();
  });
});
