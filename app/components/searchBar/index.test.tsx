import { screen, render, fireEvent, getByTestId } from '@testing-library/react';
import SearchBar from '.';

it('renders a input field', () => {
  render(<SearchBar placeholder="Search" defaultValue="" onChangeValue={() => {}} />);

  const searchBar = screen.getByTestId('searchBar');
  expect(searchBar).toBeInTheDocument();
});

it('checks input value to be empty', () => {
  render(<SearchBar placeholder="" defaultValue="" onChangeValue={() => {}} />);
  const inputElement = screen.getByTestId('searchBar');
  expect(inputElement).toBeInTheDocument();
});

it('checks input letter', () => {
  render(<SearchBar placeholder="" onChangeValue={jest.fn((value) => {})} />);
  const letters = 'abcdefghizklmnopqrstuvwxyz';
  const input = screen.getByTestId('searchBar') as HTMLInputElement;
  fireEvent.change(input, { target: { value: letters } });
  expect(input).toHaveValue(letters);
});

it('check input symbols', () => {
  render(<SearchBar placeholder="" defaultValue="" onChangeValue={() => {}} />);
  const symbols = '!@#$%^&*()_+-=';
  const inputSymbols = screen.getByTestId('searchBar') as HTMLInputElement;
  fireEvent.change(inputSymbols, { target: { value: symbols } });
  expect(inputSymbols).toHaveValue(symbols);
});
