interface SliderProps {
  isOpen: boolean;
  toggle: Function;
}

function Slider({ isOpen, toggle }: SliderProps) {
  return (
    // Overlay
    <div
      className={`${
        isOpen ? 'fixed right-0 top-0 w-screen h-screen backdrop-blur-sm' : 'w-0'
      } z-[1000]`}
    >
      {/* Slider */}
      <div
        className={`fixed w-72 h-screen top-0 transition-[ease-in-out_duration-1000] bg-[#D9D9D9] pointer-events-auto ${
          isOpen ? 'right-0' : 'right-[-20rem]'
        }`}
        data-testid="slider"
      >
        <div className="block text-right mr-5 mt-5">
          {/* Close Button */}
          <button
            className="right-6 top-3 px-3 py-1 bg-[#F5F5F5] text-[12px] rounded-[6px] text-[#737373] cursor-pointer"
            data-testid="slider-close-button"
            onClick={() => toggle(false)}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slider;
