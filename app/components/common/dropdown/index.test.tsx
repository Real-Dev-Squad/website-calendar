import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '.';

it('renders a dropwdown element', () => {
  render(<Dropdown placeholder="select timezone" setUserTimezone={jest.fn()} />);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toBeInTheDocument();
});

it('checks if the click for showing dropdown is working', () => {
  render(<Dropdown placeholder="select timezone" setUserTimezone={jest.fn()} />);
  const dropdownController = screen.getByTestId('dropdown-controller');
  const optionList = screen.getByTestId('option-list');
  expect(optionList).toHaveClass('hidden');
  fireEvent.click(dropdownController);
  expect(optionList).not.toHaveClass('hidden');
});

it('checks if all options are rendered', () => {
  render(<Dropdown placeholder="select timezone" setUserTimezone={jest.fn()} />);
  const option1 = screen.getByTestId('option-1');
  const option2 = screen.getByTestId('option-2');
  const option3 = screen.getByTestId('option-3');
  const option4 = screen.getByTestId('option-4');
  expect(option1).toBeInTheDocument();
  expect(option2).toBeInTheDocument();
  expect(option3).toBeInTheDocument();
  expect(option4).toBeInTheDocument();
});

it('checks if the click on any option changes the value of dropdown', async () => {
  const { getByTestId } = render(
    <Dropdown placeholder="select timezone" setUserTimezone={jest.fn()} />,
  );
  const dropdownController = getByTestId('dropdown-controller');
  const option = getByTestId('option-1');
  fireEvent.click(dropdownController);
  const dropdownValue = screen.getByTestId('dropdown-value') as HTMLButtonElement;
  // click on dropdown
  fireEvent.click(dropdownController);
  // select the first option in the dropdown
  fireEvent.click(option, {
    target: { innerText: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi' },
  });

  expect(dropdownValue).toHaveValue('(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi');
});
