import React from 'react';
import { render, screen } from '@testing-library/react';

import { VarDisplay } from '../src/VarDisplay';
import { VarUI } from '../src/VarUI';

describe('VarDisplay', () => {
  it('should render without crashing', () => {
    render(<VarDisplay />);
  });

  it('should display value', async () => {
    render(<VarDisplay value="Value" />);
    const value = await screen.findByText('Value');
    expect(value).toBeInTheDocument();
  });

  it('should render error from property', async () => {
    render(<VarDisplay path="value" error="example error" />);
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
        <VarDisplay path="value" />
      </VarUI>
    );
    expect(screen.getByText('example error')).toBeInTheDocument();
  });
});
