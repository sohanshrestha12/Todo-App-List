import TodoLists from "@/components/TodoLists";
import { CiViewList } from "react-icons/ci";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col py-20">
      <span className="text-4xl flex gap-2 font-bold uppercase mb-3">
        Todo List <CiViewList size={45} />
      </span>
      <TodoLists />
    </div>
  );
}
