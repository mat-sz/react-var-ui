import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { VarCategory, IVarCategoryProps, VarString } from '../src';

export default {
  title: 'VarCategory',
  component: VarCategory,
  argTypes: {
    label: { control: 'text' },
    collapsible: { control: 'boolean' },
  },
  args: {
    label: 'VarCategory',
    collapsible: false,
  },
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

const Template: StoryFn<IVarCategoryProps> = args => (
  <VarCategory {...args}>
    <VarString />
  </VarCategory>
);

export const Default = Template.bind({});
Default.args = {};
Default.storyName = 'default';

export const Collapsible = Template.bind({});
Collapsible.args = {
  collapsible: true,
};
Collapsible.storyName = 'collapsible: true';
