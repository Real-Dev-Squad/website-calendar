import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EventVisibilitySetter, { EventVisibilityProps } from './EventVisibilitySetter';

describe('EventVisibilitySetter', () => {
  let setVisibility: jest.Mock;
  let props: EventVisibilityProps;

  beforeEach(() => {
    setVisibility = jest.fn();
    props = {
      isPrivate: false,
      setVisibility,
    };
  });

  it('should display globe icon when visibility is public', () => {
    render(<EventVisibilitySetter {...props} />);
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
  });

  it('should display lock icon when visibility is private', () => {
    props.isPrivate = true;
    render(<EventVisibilitySetter {...props} />);
    expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
  });

  it('should toggle visibility when clicked', () => {
    render(<EventVisibilitySetter {...props} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(setVisibility).toHaveBeenCalledWith(true);
  });

  it('should display tooltip on hover', async () => {
    render(<EventVisibilitySetter {...props} />);
    fireEvent.mouseOver(screen.getByTestId('globe-icon'));
    await waitFor(() => {
      expect(screen.getByText('Public')).toBeInTheDocument();
    });
  });

  it('should show tooltip on mouse enter and hide on mouse leave', async () => {
    // Set up initial props and render the component
    const setVisibilityMock = jest.fn();
    render(<EventVisibilitySetter isPrivate={false} setVisibility={setVisibilityMock} />);

    // Find the icon element
    const icon = screen.getByTestId('globe-icon');

    // Trigger mouse enter and mouse leave events
    fireEvent.mouseEnter(icon);

    // Verify tooltip is displayed
    let tooltip: HTMLElement | null = screen.getByText('Public');
    expect(tooltip).toBeInTheDocument();

    // Trigger mouse leave event
    fireEvent.mouseLeave(icon);

    // Verify tooltip is not displayed anymore
    tooltip = screen.queryByText('Public');
    expect(tooltip).not.toBeInTheDocument();
  });

  // This will test for both background colors
  it('should show correct background color based on the visibility', () => {
    props.isPrivate = false;
    const { rerender } = render(<EventVisibilitySetter {...props} />);
    expect(screen.getByTestId('bg-toggle-span')).toHaveClass('bg-green-400');

    props.isPrivate = true;
    rerender(<EventVisibilitySetter {...props} />);
    expect(screen.getByTestId('bg-toggle-span')).toHaveClass('bg-gray-400');
  });

  // This will test toggling from private to public
  it('should toggle from private to public', () => {
    props.isPrivate = true;
    render(<EventVisibilitySetter {...props} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(setVisibility).toHaveBeenCalledWith(false);
  });

  it('should display correct tooltip text when visibility is public', async () => {
    render(<EventVisibilitySetter isPrivate={false} setVisibility={jest.fn()} />);
    const icon = screen.getByTestId('icon-container');
    fireEvent.mouseEnter(icon);
    await waitFor(() => {
      expect(screen.getByText('Public')).toBeInTheDocument();
    });
  });

  it('should display correct tooltip text when visibility is private', async () => {
    render(<EventVisibilitySetter isPrivate={true} setVisibility={jest.fn()} />);
    const icon = screen.getByTestId('icon-container');
    fireEvent.mouseEnter(icon);
    await waitFor(() => {
      expect(screen.getByText('Private')).toBeInTheDocument();
    });
  });
});
