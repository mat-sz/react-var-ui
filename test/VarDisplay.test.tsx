import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarDisplay } from '../src/VarDisplay';

describe('VarDisplay', () => {
  it('should render without crashing', () => {
    render(<VarDisplay />);
  });

  it('should display value', async () => {
    render(<VarDisplay value="Value" />);
    const value = await screen.findByText('Value');
    expect(value).toBeInTheDocument();
  });
});
