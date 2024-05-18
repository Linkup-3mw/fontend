import { ChangeEvent, forwardRef } from 'react';
import Check from '../icons/Check';

interface Props {
  name: string;
  children: React.ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}
const Checkbox = ({ name, children, isChecked, onChange }: Props) => {
  return (
    <>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="peer hide"
          onChange={onChange}
          name={name}
          checked={isChecked || false}
        />
        <span className="peer-checked:inline-block hidden mr-[0.5rem]">
          <Check color="#97BAFE" />
        </span>
        <span className="peer-checked:hidden inline-block mr-[0.5rem]">
          <Check />
        </span>
        {children}
      </label>
    </>
  );
};

export default Checkbox;