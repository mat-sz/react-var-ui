import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.scss';

import { VarUI, VarColor, VarToggle, VarSelect, VarCategory } from '../.';

const App = () => {
  const [values, setValues] = React.useState({
    toggle: true,
    color: '#FF0000',
    select: 1
  });

  return (
    <div>
      <h1>VarUI example</h1>
      <div className="example">
        <div className="wrapper">
          <VarUI updateValues={setValues} values={values}>
            <VarCategory label="Example">
              <VarColor path="color" label="Color" />
              <VarToggle path="toggle" label="Toggle" />
              <VarSelect
                path="select"
                label="Select"
                options={[
                  { key: 0, label: 'Zero' },
                  { key: 1, label: 'One' }
                ]}
              />
            </VarCategory>
          </VarUI>
        </div>
        <div className="values">
          <strong>Values:</strong>
          <dl>
            <dt>toggle</dt>
            <dd>{values.toggle ? 'true' : 'false'}</dd>
            <dt>color</dt>
            <dd>{values.color}</dd>
            <dt>select</dt>
            <dd>{values.select}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
