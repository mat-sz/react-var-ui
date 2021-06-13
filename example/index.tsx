import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.scss';

import {
  VarUI,
  VarColor,
  VarToggle,
  VarSelect,
  VarSlider,
  VarXY,
  VarCategory
} from '../.';

const App = () => {
  const [values, setValues] = React.useState({
    toggle: true,
    color: '#FF0000',
    select: 1,
    slider: 0.4,
    xy: [0, 0]
  });

  return (
    <div>
      <h1>VarUI example</h1>
      <div className="example">
        <div className="wrapper">
          <VarUI updateValues={setValues} values={values}>
            <VarCategory label="Example">
              <VarColor label="VarColor" path="color" />
              <VarToggle label="VarToggle" path="toggle" />
              <VarSelect
                path="select"
                label="VarSelect"
                options={[
                  { key: 0, label: 'Zero' },
                  { key: 1, label: 'One' }
                ]}
              />
              <VarSlider
                label="VarSlider"
                path="slider"
                min={0.2}
                max={0.8}
                step={0.1}
              />
              <VarSlider
                label="VarSlider (showInput + showButtons)"
                path="slider"
                min={0.2}
                max={0.8}
                step={0.1}
                showInput
                showButtons
              />
              <VarSlider
                label="VarSlider (showInput)"
                path="slider"
                min={0.2}
                max={0.8}
                step={0.1}
                showInput
              />
              <VarSlider
                label="VarSlider (showButtons)"
                path="slider"
                min={0.2}
                max={0.8}
                step={0.1}
                showButtons
              />
              <VarXY label="VarXY" path="xy" />
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
            <dt>slider</dt>
            <dd>{values.slider}</dd>
            <dt>xy</dt>
            <dd>
              {values.xy[0]}, {values.xy[1]}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
