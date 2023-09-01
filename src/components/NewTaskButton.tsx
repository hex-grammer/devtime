import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useTaskMutationContext } from "~/context/TaskMutationContext";
import { useGetTasksContext } from "~/context/GetTaskContext";
import { useCreateTasksContext } from "~/context/CreateTaskContext";
import { addNewTask } from "~/utils/addNewTask";
import { produce } from "immer";

interface NewTaskButtonProps {
  isActive?: boolean;
  projectId: string;
  order: "first" | "last";
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({
  isActive = false,
  projectId,
  order,
}) => {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const { setIsCreateNewTask } = useCreateTasksContext();
  const { setTasks } = useGetTasksContext();
  const taskMutation = useTaskMutationContext();

  const handleSave = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement, Element>
  ) => {
    e.preventDefault();
    setTaskTitle("");
    setEditing(false);
    setIsCreateNewTask(false);

    // return if task title is empty
    if (!taskTitle) {
      setIsCreateNewTask(false);
      return setEditing(false);
    }

    // create a new task
    setTasks(
      produce((draft) => {
        draft.push(addNewTask(draft, taskTitle, order));
      })
    );
    await taskMutation.createNewTask(projectId, taskTitle, order);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  return (
    <div className="mb-1">
      {editing || isActive ? (
        <input
          type="text"
          value={taskTitle}
          onChange={handleChange}
          onBlur={(e) => void handleSave(e)}
          placeholder="Task title..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleSave(event);
            }
          }}
          className="w-full cursor-text rounded-md border border-blue-600 bg-gray-700 p-2 py-1 text-left text-gray-200 outline-none"
          autoFocus
        />
      ) : (
        <button
          onClick={() => setEditing((e) => !e)}
          className="flex w-full cursor-pointer items-center gap-1 rounded-md p-2 py-1 text-left text-gray-400 hover:bg-gray-600"
        >
          <AiOutlinePlus className="text-xl font-bold" /> New Task
        </button>
      )}
    </div>
  );
};

export default NewTaskButton;
