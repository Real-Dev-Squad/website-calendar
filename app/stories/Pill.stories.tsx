import { ComponentMeta, ComponentStory } from '@storybook/react';
import Pill from '../components/Pill.client';

export default {
  title: 'components/Pill',
  Component: Pill,
  args: {
    title: 'JavaScript',
  },
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = (props) => <Pill {...props} />;

export const Primary = Template.bind({});
