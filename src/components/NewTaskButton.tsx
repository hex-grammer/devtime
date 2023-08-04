import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useTaskContext } from "~/context/AppContext";
import { useTaskMutationContext } from "~/context/TaskMutationContext";
// import { mutate } from "swr";

interface NewTaskButtonProps {
  isActive?: boolean;
  projectId: string;
}

const NewTaskButton: React.FC<NewTaskButtonProps> = ({
  isActive = false,
  projectId,
}) => {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const { setIsCreateNewTask } = useTaskContext();
  const taskMutation = useTaskMutationContext();

  const handleButtonClick = () => {
    if (!editing) {
      setEditing(true);
    }
  };

  const handleSave = () => {
    // return if task title is empty
    if (!taskTitle) {
      setIsCreateNewTask(false);
      return setEditing(false);
    }

    // create a new task
    taskMutation.createNewTask(projectId, taskTitle);

    setTaskTitle("");
    setEditing(false);
    setIsCreateNewTask(false);
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
          onBlur={() => void handleSave()}
          placeholder="Task title..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleSave();
            }
          }}
          className="w-full cursor-text rounded-md border border-blue-600 bg-gray-700 p-2 py-1 text-left text-gray-200 outline-none"
          autoFocus
        />
      ) : (
        <button
          onClick={handleButtonClick}
          className="flex w-full cursor-pointer items-center gap-1 rounded-md p-2 py-1 text-left text-gray-400 hover:bg-gray-600"
        >
          <AiOutlinePlus className="text-xl font-bold" /> New Task
        </button>
      )}
    </div>
  );
};

export default NewTaskButton;
