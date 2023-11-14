import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarSelect, IVarSelectProps } from '../src';

export default {
  title: 'VarSelect',
  component: VarSelect,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'VarSelect',
    disabled: false,
    options: [
      {
        key: '1',
        label: 'Test 1',
      },
      {
        key: '2',
        label: 'Test 2',
      },
      {
        key: '3',
        label: 'Test 3',
      },
    ],
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: Story<IVarSelectProps> = args => {
  const [value, setValue] = useState('1');
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarSelect {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.storyName = 'disabled: true';

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
};
ReadOnly.storyName = 'readOnly: true';
