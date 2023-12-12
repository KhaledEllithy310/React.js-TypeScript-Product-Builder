import { ButtonHTMLAttributes, ReactNode } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}
const Button = ({
  children,
  className,
  width = "w-full",
  ...rest
}: IButtonProps) => {
  console.log({ rest });

  return (
    <button
      className={`${className} ${width} text-white rounded-md py-1 font-medium capitalize`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
