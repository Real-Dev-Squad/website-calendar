import dayjs from 'dayjs';
import { FC } from 'react';

const Rspinner: FC = () => {
  const today = dayjs().date();

  return (
    <div
      data-testid="spinner-container"
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700"
    >
      <div className="relative">
        <div className="animate-bounce bg-white w-24 h-24 p-2 rounded-lg flex flex-col items-center">
          <div className="flex">
            <div
              data-testid="loading-dot"
              className="bg-red-400 w-3 h-3 rounded-full mr-1 animate-pulse"
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              data-testid="loading-dot"
              className="bg-red-400 w-3 h-3 rounded-full mr-1 animate-pulse"
              style={{ animationDelay: '0.3s' }}
            ></div>
            <div
              data-testid="loading-dot"
              className="bg-red-400 w-3 h-3 rounded-full animate-pulse"
              style={{ animationDelay: '0.6s' }}
            ></div>
          </div>
          <div className="flex-1 flex justify-center items-center text-2xl">{today}</div>
        </div>
      </div>
    </div>
  );
};

export default Rspinner;
