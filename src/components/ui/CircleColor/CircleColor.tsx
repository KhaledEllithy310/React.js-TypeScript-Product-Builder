import { HTMLAttributes } from "react";

interface ICircleColorProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...rest }: ICircleColorProps) => {
  return (
    <span
      key={color}
      className={`w-5 h-5 rounded-full cursor-pointer mb-1 first-of-type:ml-1`}
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};

export default CircleColor;
