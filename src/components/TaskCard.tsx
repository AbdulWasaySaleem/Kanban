import React, { useState } from "react";
import { Id, Task } from "../Model/Type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface IProps {
  tasks: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ tasks, deleteTask, updateTask }: IProps) {
  const [enableDel, setEnableDel] = useState(false);
  const [editMode, setEditMode] = useState(false);

  //TaskDrag
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: tasks.id,
    data: {
      type: "Task",
      tasks,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  //dragging
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50 bg-blue-300 cursor-grab flex justify-between h-[60px]"
      />
    );
  }
  const toggleEdit = () => {
    setEditMode((prev) => !prev);
    setEnableDel(false);
  };

  if (editMode) {
    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="bg-blue-300 cursor-grab flex justify-between h-[60px]"
        >
          <textarea
            className="bg-transparent w-full border-blue-200 bg-blue-400 m-2 p-2 "
            value={tasks.content}
            autoFocus
            placeholder="Task content here"
            onBlur={toggleEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                toggleEdit();
              }
            }}
            onChange={(e) => updateTask(tasks.id, e.target.value)}
          ></textarea>
        </div>
      </>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEdit}
      onMouseEnter={() => setEnableDel(true)}
      onMouseLeave={() => setEnableDel(false)}
      className="bg-blue-400 cursor-grab flex justify-between h-[60px]"
    >
      <p>{tasks.content}</p>
      {enableDel && (
        <button
          className="whitespace-pre-wrap"
          onClick={() => deleteTask(tasks.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export default TaskCard;
