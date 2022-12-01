import { queryByTestId, render, screen } from '@testing-library/react';
import UserInput from '.';

it('renders a input field', () => {
  render(<UserInput label="Username" placeholder="enter your name" link="hap.day/" />);
  const userInput = screen.getByTestId('user-input');
  expect(userInput).toBeInTheDocument();
});

it('checks added button in input field wrapper', () => {
  render(<UserInput label="Username" placeholder="enter your name" link="hap.day/" />);
  const userInputWrapper = screen.getByTestId('user-input-wrapper');
  const button = screen.getByTestId('url-btn');
  expect(userInputWrapper).toContainElement(button);
});

it('checks input value to be empty', () => {
  render(<UserInput label="Username" placeholder="enter your name" />);
  const inputElement = screen.getByTestId('user-input');
  expect(inputElement).toHaveValue('');
});
