import { FC, Dispatch, SetStateAction, useState } from 'react';
import TimezoneSelect, { ITimezone } from 'react-timezone-select';
import useIsClient from '../../../hooks/isClient';
import { UserFormInterface } from '~/utils/interfaces';

interface DropdownProps {
  placeholder: string;
  setUserTimezone: Dispatch<SetStateAction<UserFormInterface>>;
}

const TzPicker: FC<DropdownProps> = ({ placeholder, setUserTimezone }) => {
  const [selectedTimezone, setSelectedTimezone] = useState<ITimezone>('');
  const isClient = useIsClient();

  const renderTzPicker = () => (
    <TimezoneSelect
      value={selectedTimezone}
      onChange={(tz) => {
        setSelectedTimezone(tz);
        setUserTimezone((prev) => ({ ...prev, timezone: tz.label }));
      }}
    />
  );

  const renderEmptyBorder = () => (
    <div
      data-testid="empty-border"
      className="h-[46px] border-stone-400 bg-stone-50 rounded-lg border-solid border"
    ></div>
  );

  return (
    <div>
      <p className="text-sm text-black mb-2 ">{placeholder}</p>
      {/* TimezoneSelect is not SSR compatible; fallback required */}
      {isClient ? renderTzPicker() : renderEmptyBorder()}
    </div>
  );
};

export default TzPicker;
