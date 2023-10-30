import { StylesConfig } from 'react-select';

type OptionType = {
  label: string;
  value: string;
};

// Tailwind's slate-500 color
const slate500 = '#718096';

export const monthDropdownStyle: StylesConfig<OptionType, false> = {
  menu: (provided) => ({
    ...provided,
    minWidth: '120px',
    borderRadius: '8px',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '14px',
  }),
  control: (provided) => ({
    ...provided,
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: 'none',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: slate500,
    padding: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
