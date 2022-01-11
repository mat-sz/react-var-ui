import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarFile, IVarFileProps } from '../src';

export default {
  title: 'VarFile',
  component: VarFile,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    displayMetadata: { control: 'boolean' },
  },
  args: {
    label: 'VarFile',
    disabled: false,
    displayMetadata: true,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: Story<IVarFileProps> = args => {
  const [value, setValue] = useState<File>(undefined);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarFile {...args} value={value} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.storyName = 'disabled: true';
