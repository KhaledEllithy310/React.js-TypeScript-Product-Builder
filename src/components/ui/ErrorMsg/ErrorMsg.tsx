interface IErrorMsgProps {
  msg: string;
}
const ErrorMsg = ({ msg }: IErrorMsgProps) => {
  console.log(msg);

  return msg ? (
    <span className="text-red-700 text-sm font-semibold block">{msg}</span>
  ) : null;
};

export default ErrorMsg;
