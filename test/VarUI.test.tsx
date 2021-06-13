import React from 'react';
import * as ReactDOM from 'react-dom';
import { VarUI } from '../src/VarUI';

describe('VarUI', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VarUI values={{}} updateValues={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
