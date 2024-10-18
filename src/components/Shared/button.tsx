interface ButtonProps<T> {
  label: string;
  action: (arg: T) => void;
  arg: T;
  color?: string;
}

const Button = <T,>(props: ButtonProps<T>) => {
  return (
    <button
      class={`${
        props.color || "bg-blue-500"
      } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={() => props.action(props.arg)}
    >
      {props.label}
    </button>
  );
};

export default Button;
