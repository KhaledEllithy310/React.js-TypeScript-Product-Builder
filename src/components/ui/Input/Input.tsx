import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input = ({ label, ...rest }: IInputProps) => {
  return (
    <>
      <label htmlFor="" className="capitalize text-sm font-medium mb-[2px]">
        {label}
      </label>
      <input
        className="border-2 border-gray-300 rounded-md focus:outline-none p-2 focus:border-indigo-600 shadow-md"
        {...rest}
      />
    </>
  );
};

export default Input;
