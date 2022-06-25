import { v4 as uuidv4 } from 'uuid';

/* eslint-disable-next-line */
export interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export function Input({label, name, type, value, onChange}: InputProps) {
  const id = `${uuidv4()}_${name}`;
  return (
    <>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={id}>
        {label}
      </label>
      <input
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={label}
      />
    </>
  );
}

export default Input;
