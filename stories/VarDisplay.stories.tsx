import React from 'react';
import { Meta, Story } from '@storybook/react';

import { VarDisplay, IVarDisplayProps } from '../src';

export default {
  title: 'VarDisplay',
  component: VarDisplay,
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'VarDisplay',
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

const Template: Story<IVarDisplayProps> = args => <VarDisplay {...args} />;

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
