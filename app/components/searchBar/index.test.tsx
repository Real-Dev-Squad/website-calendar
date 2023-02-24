import { screen, render, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import SearchBar from '.';
import userEvent from '@testing-library/user-event';

describe('Input Value', () => {
  it('renders a input field', () => {
    render(<SearchBar placeholder="Search" defaultValue="" onChangeValue={() => {}} />);
    const searchBar = screen.getByTestId('searchBar');
    expect(searchBar).toBeInTheDocument();
  });
});

describe('Not Empty', () => {
  it('checks input value to be empty', () => {
    render(<SearchBar placeholder="" defaultValue="" onChangeValue={() => {}} />);
    const inputElement = screen.getByTestId('searchBar');
    expect(inputElement).toBeInTheDocument();
  });
});

describe('Accepting Letters', () => {
  it('checks input letter', () => {
    render(<SearchBar placeholder="" onChangeValue={jest.fn((value) => {})} />);
    const letters = 'abcdefghizklmnopqrstuvwxyz';
    const input = screen.getByTestId('searchBar') as HTMLInputElement;
    fireEvent.change(input, { target: { value: letters } });
    expect(input).toHaveValue(letters);
  });
});

describe('Accepting Symbols', () => {
  it('check input symbols', () => {
    render(<SearchBar placeholder="" defaultValue="" onChangeValue={() => {}} />);
    const symbols = '!@#$%^&*()_+-=';
    const inputSymbols = screen.getByTestId('searchBar') as HTMLInputElement;
    fireEvent.change(inputSymbols, { target: { value: symbols } });
    expect(inputSymbols).toHaveValue(symbols);
  });
});

describe('Check Input', () => {
  it('Input Matched', async () => {
    render(<SearchBar placeholder="" defaultValue="" onChangeValue={jest.fn((value) => {})} />);
    const box = screen.getByRole('searchbox') as HTMLInputElement;
    await userEvent.click(box);
    await userEvent.keyboard('helloworld');

    await waitFor(() => {
      expect(box.value).toBe('helloworld');
    });
  });
});

describe('checking placeholder', () => {
  it('checking placeholder value', () => {
    render(<SearchBar placeholder="SearchBar" onChangeValue={jest.fn(() => {})} />);
    const inputPlaceholder = screen.getByPlaceholderText('SearchBar');
    expect(inputPlaceholder).toBeDefined();
  });

  it('placeholder should be Search when no prop is passed', () => {
    render(<SearchBar defaultValue="" onChangeValue={jest.fn(() => {})} />);
    const inputBox = screen.queryByPlaceholderText('Search') as HTMLInputElement;
    expect(inputBox).toBeDefined();
  });
});
