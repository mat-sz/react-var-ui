import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useState } from '@storybook/preview-api';

import { VarImage, IVarImageProps } from '../src';

export default {
  title: 'VarImage',
  component: VarImage,
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'VarImage',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
} as Meta;

const Template: StoryFn<IVarImageProps> = args => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const onChange = useCallback(
    value => {
      setValue(value);
      args.onChange?.(value);
    },
    [setValue, args]
  );
  return <VarImage {...args} value={value} onChange={onChange} />;
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
