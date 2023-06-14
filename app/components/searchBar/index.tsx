import React, { useState } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// for passing props creating interface
interface SearchProps {
  placeholder?: string;
  defaultValue?: string;
  onChangeValue: (value: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({
  placeholder = 'Search',
  defaultValue,
  onChangeValue,
}) => {
  return (
    <div className="flex justify-center bg-gray-100 rounded-xl  border-2 overflow-hidden w-80 m-2">
      <MagnifyingGlassIcon className="h-8.5 w-5 mx-2 text-gray-500" />
      <input
        data-testid="searchBar"
        type="search"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={(e) => onChangeValue(e.target.value)}
        className="block rounded-md border-0 flex-grow p-2 bg-gray-100"
      />
    </div>
  );
};

export default SearchBar;
