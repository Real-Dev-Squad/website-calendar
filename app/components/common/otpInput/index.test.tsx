import { fireEvent, render, screen } from '@testing-library/react';
import OTPInput from '.';

it('render otp input ', () => {
  render(<OTPInput otpLength={4} />);
  /* need to change getAllByTestId to getByTestId */
  const otpInput = screen.getAllByTestId('otp-input');
  expect(otpInput).toHaveLength(4);
});

it('checks move to next otp input element on typing', () => {
  render(<OTPInput otpLength={4} />);
  const otpInput = screen.getAllByTestId('otp-input');
  fireEvent.keyUp(otpInput[0]);
  expect(otpInput[1]).toHaveFocus();
});

it('checks last otp input element on typing', () => {
  render(<OTPInput otpLength={4} />);
  const otpInput = screen.getAllByTestId('otp-input');

  fireEvent.keyUp(otpInput[3]);

  expect(document.body).toHaveFocus();
});

it('check move to previous otp input element', () => {
  render(<OTPInput otpLength={4} />);
  const otpInput = screen.getAllByTestId('otp-input');
  fireEvent.keyUp(otpInput[2], { key: 'Delete' });
  expect(otpInput[1]).toHaveFocus();
});
