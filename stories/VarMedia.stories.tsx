import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useCallback, useState } from '@storybook/client-api';

import { VarMedia, IVarMediaProps } from '../src';

export default {
  title: 'VarMedia',
  component: VarMedia,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    acceptImage: { control: 'boolean' },
    acceptVideo: { control: 'boolean' },
    acceptAudio: { control: 'boolean' },
  },
  args: {
    label: 'VarMedia',
    disabled: false,
    acceptImage: true,
    acceptVideo: true,
    acceptAudio: true,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: Story<IVarMediaProps> = args => {
  const [value, setValue] = useState<string>(undefined);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange(value);
    },
    [setValue, args]
  );
  return <VarMedia {...args} value={value} onChange={onChange} />;
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
