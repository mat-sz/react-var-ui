import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarNumber, IVarNumberProps } from '../src';

export default {
  title: 'VarNumber',
  component: VarNumber,
  argTypes: {
    min: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    max: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    step: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    integer: { control: 'boolean' },
    showInput: { control: 'boolean' },
    showButtons: { control: 'boolean' },
    defaultValue: { control: { type: 'range', min: 0, max: 10, step: 0.1 } },
    label: { control: 'text' },
    disabled: { control: 'boolean' }
  },
  args: {
    min: 0,
    max: 10,
    step: 1,
    label: 'VarNumber',
    disabled: false,
    showButtons: true
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' }
  }
} as Meta;

const Template: Story<IVarNumberProps> = args => {
  const [value, setValue] = useState(args.value ?? 0);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarNumber {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};
Disabled.storyName = 'disabled: true';

export const NoButtons = Template.bind({});
NoButtons.args = { showButtons: false };
NoButtons.storyName = 'showButtons: false';
