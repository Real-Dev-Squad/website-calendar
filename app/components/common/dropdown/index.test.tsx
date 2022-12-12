import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dropdown from '.';

it('renders a dropwdown element', () => {
  render(<Dropdown placeholder="select timezone" />);
  const dropdown = screen.getByTestId('dropdown');

  expect(dropdown).toBeInTheDocument();
});

it('checks if the click for showing dropdown is working', () => {
  render(<Dropdown placeholder="select timezone" />);
  const dropdownController = screen.getByTestId('dropdown-controller');
  const optionList = screen.getByTestId('option-list');
  expect(optionList).toHaveClass('hidden');
  fireEvent.click(dropdownController);
  expect(optionList).not.toHaveClass('hidden');
});

it('checks if the click on any option changes the value of dropdown', async () => {
  const { getByTestId } = render(<Dropdown placeholder="select timezone" />);
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
