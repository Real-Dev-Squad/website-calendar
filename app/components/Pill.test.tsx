import { render, screen } from '@testing-library/react';
import Pill from './Pill.client';

it('renders a pill with javascript text', () => {
  render(<Pill title="Javascript" />);
  const pillButton = screen.getByRole('button');
  expect(pillButton).toHaveTextContent('Javascript');
});

it('checks icon in pill button', () => {
  render(<Pill title="Javascript" />);
  const pillButton = screen.getByRole('button');
  const svg = screen.getByTestId('icon');
  expect(pillButton).toContainElement(svg);
  const svgOnHover = screen.getByTestId('icon-on-hover');
  expect(pillButton).toContainElement(svgOnHover);
});
