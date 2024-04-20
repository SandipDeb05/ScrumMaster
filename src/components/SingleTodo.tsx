import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../models/model";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({
  todo,
  todos,
  setTodos,
  index,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleOnSave = (e: React.FormEvent, id: number): void => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleOnSave(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEdit ? (
            <input
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          <div>
            <span className="icon">
              <FaEdit
                onClick={() => {
                  if (!todo.isDone && !isEdit) {
                    setIsEdit((prev) => !prev);
                  }
                }}
              />
            </span>
            <span className="icon">
              <MdDeleteForever onClick={() => handleDelete(todo.id)} />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <IoCheckmarkDoneCircle />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
