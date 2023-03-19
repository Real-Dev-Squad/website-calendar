import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Button, LinkButton } from '../Button';

describe('Button', () => {
  const btnText = 'Click me';
  it('renders', () => {
    const { getByText } = render(
      <Button size="small" label={btnText} varient="primary" disabled={false} />
    );
    expect(getByText(btnText)).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    const { getByText } = render(
      <Button size="small" label={btnText} varient="primary" disabled={false} />
    );
    expect(getByText(btnText)).toHaveClass('py-1 px-2 text-sm gap-1');
    expect(getByText(btnText).classList.contains('border-transparent')).toBeTruthy();
    expect(getByText(btnText)).not.toBeDisabled();
  });

  it('renders with different varients', () => {
    const { getByText } = render(
      <Button
        size="medium"
        label={btnText}
        varient="primary"
        disabled={false}
        handleClick={jest.fn(() => null)}
      />
    );
    const btnElement = getByText(btnText);
    expect(getByText(btnText)).toHaveClass('bg-blue-600 text-white');
    act(() => {
      fireEvent.click(btnElement);
    });
    expect(getByText(btnText).classList.contains('border-transparent')).toBeTruthy();
  });

  it('should render button with secondary btn variant', () => {
    const handleClick = jest.fn();
    render(
      <Button
        size="large"
        label={btnText}
        varient="secondary"
        disabled={false}
        handleClick={handleClick}
      />
    );
  });

  it('should pass default ButtonProps', () => {
    const handleClick = jest.fn();
    render(<Button label={btnText} handleClick={handleClick} />);
  });
});

describe('LinkButton', () => {
  const btnText = 'Click me';
  it('renders', () => {
    const { getByText } = render(
      <LinkButton href="/" title={btnText} icon={() => <div>Icon</div>} />
    );
    expect(getByText(btnText)).toBeInTheDocument();
  });
});
