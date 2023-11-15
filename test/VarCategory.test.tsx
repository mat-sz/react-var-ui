import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { VarCategory } from '../src/VarCategory';
import { VarDisplay } from '../src/VarDisplay';

describe('VarCategory', () => {
  it('renders without crashing', () => {
    render(<VarCategory label="Test" />);
  });

  it('label: displayed', async () => {
    render(<VarCategory label="Test" />);
    const value = await screen.findByText('Test');
    expect(value).toBeTruthy();
  });

  it('collapse: should collapse when collapse button clicked', async () => {
    render(
      <VarCategory collapsible label="Test">
        <VarDisplay value="contents" />
      </VarCategory>
    );

    const button = await screen.findByTitle('Collapse');
    fireEvent.click(button);

    const value = screen.queryByText('contents');
    expect(value).toBeNull();

    fireEvent.click(button);

    expect(screen.getByText('contents')).toBeInTheDocument();
  });
});
