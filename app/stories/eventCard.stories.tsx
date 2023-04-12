import { Story, Meta } from '@storybook/react';
import { Event } from '~/utils/interfaces';
import EventCard from '../components/common/eventCard/index';

export default {
  title: 'Components/EventCard',
  component: EventCard,
  argTypes: {
    name: { control: 'text' },
  },
} as Meta;

const Template: Story<Event> = (args: Event) => <EventCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'Example Event',
  attendees: [],
};
