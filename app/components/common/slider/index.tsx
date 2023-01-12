import React from 'react';

interface SliderProps {
  toOpen: boolean;
  setToggle: Function;
}

function Slider({ toOpen, setToggle }: SliderProps) {
  return (
    // Overlay
    <div
      className={`${
        toOpen ? 'absolute top-0 right-0 z-10 w-screen h-screen backdrop-blur-sm' : 'w-0'
      }`}
    >
      {/* Slider */}
      <div
        className="fixed right-0 w-72 h-screen"
        style={{
          right: toOpen ? '0rem' : '-20rem',
          transition: '.4s ease-in-out',
          backgroundColor: '#D9D9D9',
        }}
      >
        <div className="block text-right mr-5 mt-5">
          {/* Close Button */}
          <button
            className="right-6 top-3 px-3 py-1"
            style={{
              backgroundColor: '#F5F5F5',
              fontSize: '12px',
              borderRadius: '6px',
              color: '#737373',
            }}
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
