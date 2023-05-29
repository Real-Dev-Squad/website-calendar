import { Story, Meta } from '@storybook/react';
import { CalEvent } from '~/utils/interfaces';
import EventCard from '~/components/common/eventCard/index';

export default {
  title: 'Components/EventCard',
  component: EventCard,
  argTypes: {
    title: { control: 'text' },
  },
} as Meta;

const Template: Story<CalEvent> = (args: CalEvent) => <EventCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Example Event',
  attendees: [],
};
