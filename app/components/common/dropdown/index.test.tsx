import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
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
  render(<Dropdown placeholder="select timezone" />);
  const dropdownController = screen.getByTestId('dropdown-controller');
  const option = screen.getByTestId('option-1');
  await fireEvent.click(dropdownController);

  // select the first option in the dropdown
  await fireEvent.click(option);
  console.log(dropdownController.textContent, dropdownController.firstChild?.textContent);

  expect(screen.getByTestId('dropdown-controller').textContent).toBe(option.textContent);
});
