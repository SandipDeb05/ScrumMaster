import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const todoHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodo(event.target.value);
  };

  const submitHandler = (event: React.FormEvent): void => {
    handleAdd(event);
    inputRef.current?.blur();
  };

  return (
    <form className="input" onSubmit={submitHandler}>
      <input
        type="input"
        placeholder="Enter a task"
        className="input__box"
        value={todo}
        onChange={todoHandler}
        ref={inputRef}
      />
      <button className="input_submit" type="submit">
        +
      </button>
    </form>
  );
};

export default InputField;
