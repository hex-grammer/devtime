import React, { useEffect, useRef } from "react";
import { Modal } from "antd";

interface CreateProjectModalProps {
  open: boolean;
  onCreate: () => void;
  confirmLoading: boolean;
  onCancel: () => void;
  projectName: string;
  onProjectNameChange: (projectName: string) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  onCreate,
  confirmLoading,
  onCancel,
  projectName,
  onProjectNameChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <>
      <Modal
        title="Crete a New Project"
        open={open}
        onOk={onCreate}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        okText="Create"
        okType="primary"
        maskStyle={{
          backdropFilter: "blur(1px)",
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#2563EB",
          },
        }}
      >
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="mt-1 w-full border-b-2 py-1 text-2xl text-gray-800 outline-none focus:border-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCreate();
            }
          }}
          placeholder="Project name..."
          ref={inputRef}
        />
      </Modal>
    </>
  );
};

export default CreateProjectModal;
