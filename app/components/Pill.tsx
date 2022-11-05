import { MouseEventHandler } from 'react';

interface PillProps {
  title: string;
  icon?: string;
  action?: MouseEventHandler;
}
const Pill: React.FC<PillProps> = ({ title, icon = '💖,#️⃣', action }) => (
  <button className="relative rounded-full bg-slate-200 group py-2 pr-4 pl-3" onClick={action}>
    <i className="absolute pr-2 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
      {icon.split(',')[0]}
    </i>
    <i className="absolute pr-2 opacity-100 group-hover:opacity-0 ease-in-out duration-300">
      {icon.split(',')[1]}
    </i>
    <span className="pl-6">{title}</span>
  </button>
);

export default Pill;
