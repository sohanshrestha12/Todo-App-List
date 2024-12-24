"use client";
import { Todo } from "@/types";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddTodo from "./AddTodo";
import InputField from "./input";

const TodoLists = () => {
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newIsCompleted, setNewIsCompleted] = useState<boolean>(false);

  const { data: todos, refetch } = trpc.todo.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const deleteTodo = trpc.todo.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate({ id });
  };

  const updateTodo = trpc.todo.update.useMutation({
    onSuccess: () => {
      refetch();
      setEditTodoId(null);
    },
  });

  const handleEditTodo = (todo: Todo) => {
    setEditTodoId(todo.id);
    setNewTitle(todo.title!);
    setNewDescription(todo.description!);
    setNewIsCompleted(todo.isCompleted);
  };

  const handleSaveEdit = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;
    updateTodo.mutate({
      id: editTodoId!.toString(),
      title: newTitle,
      description: newDescription,
      isCompleted: newIsCompleted,
    });
    setEditTodoId(null);
    setNewDescription("");
    setNewTitle("");
  };

  const handleToggleComplete = (todo: Todo) => {
    updateTodo.mutate({
      id: todo.id.toString(),
      title: todo.title!,
      description: todo.description!,
      isCompleted: !todo.isCompleted,
    });
  };

  return (
    <>
      <AddTodo refetch={refetch} />
      <div className="lg:w-[58vw] mt-3 rounded-sm shadow-sm p-3 flex flex-col gap-2 sm:w-full xs:w-full">
        {todos?.map((todo) => (
          <div key={todo.id} className="flex gap-3 items-center">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleToggleComplete(todo)}
              className="cursor-pointer h-4 w-4 rounded-md"
            />
            <div
              className={`flex-1 gap-2 flex-col p-2 rounded-md bg-slate-100 hover:bg-slate-200 ${
                todo.isCompleted && "opacity-50"
              }`}
            >
              {editTodoId! === todo.id ? (
                <div className="flex flex-col gap-2">
                  <InputField
                    value={newTitle}
                    onChange={setNewTitle}
                    placeholder="Edit title"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEdit();
                      }
                    }}
                  />
                  <InputField
                    value={newDescription}
                    onChange={setNewDescription}
                    placeholder="Edit description"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEdit();
                      }
                    }}
                  />
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 px-5 py-2 rounded-lg text-white hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditTodoId(null)}
                      className="bg-gray-500 px-5 py-2 rounded-lg text-white hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p
                    className={`text-center capitalize text-lg font-semibold ${
                      todo.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </p>
                  <p
                    className={`text-center text-md ${
                      todo.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {todo.description}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-3">
              <FaEdit
                className="hover:cursor-pointer text-lg"
                onClick={() => {
                  if (!todo.isCompleted) {
                    handleEditTodo(todo);
                  }
                }}
              />
              <FaTrash
                onClick={() => handleDeleteTodo(todo.id.toString())}
                className="text-red-500 hover:cursor-pointer hover:text-red-700"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoLists;
