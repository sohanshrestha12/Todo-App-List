"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";
import InputField from "./input";

interface AddTodoProps {
  refetch: () => void;
}

const AddTodo = ({ refetch }: AddTodoProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutate } = trpc.todo.add.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    mutate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex w-full justify-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 w-full justify-center lg:flex-row sm:flex-col sm:gap-3 sm:p-5 "
      >
        <InputField onChange={setTitle} placeholder="Add title" value={title} />
        <InputField
          onChange={setDescription}
          placeholder="Add description"
          value={description}
          className="lg:w-[40vw] sm:w-full"
        />
        <button
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
