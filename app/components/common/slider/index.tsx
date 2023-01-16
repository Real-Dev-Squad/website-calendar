import React from 'react';

interface SliderProps {
  toOpen: boolean;
  setToggle: Function;
}

function Slider({ toOpen, setToggle }: SliderProps) {
  return (
    // Overlay
    <div
      className={`${toOpen ? 'fixed right-0 top-0 w-screen h-screen backdrop-blur-sm' : 'w-0'}`}
      style={{ zIndex: '1000' }}
    >
      {/* Slider */}
      <div
        className="fixed right-0 w-72 h-screen top-0"
        data-testid="slider"
        style={{
          right: toOpen ? '0rem' : '-20rem',
          transition: '.4s ease-in-out',
          backgroundColor: '#D9D9D9',
          pointerEvents: 'auto',
        }}
      >
        <div className="block text-right mr-5 mt-5">
          {/* Close Button */}
          <button
            style={{
              backgroundColor: '#F5F5F5',
              fontSize: '12px',
              borderRadius: '6px',
              color: '#737373',
              cursor: 'pointer',
            }}
            className="right-6 top-3 px-3 py-1"
            data-testid="slider-close-button"
            onClick={() => setToggle(false)}
          >
            CLOSE
          </button>
        </div>
        {/* Things to be entered in the Slider */}
      </div>
    </div>
  );
}

export default Slider;
