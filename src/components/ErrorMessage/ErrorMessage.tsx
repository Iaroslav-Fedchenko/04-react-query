import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({
  message = "There was an error, please try again...",
}: ErrorMessageProps) {
  return <p className={css.error}>{message}</p>;
}

export default ErrorMessage;
