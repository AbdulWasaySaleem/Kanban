import { Column, Id, Task } from "../Model/Type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
interface IProps {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  //tasks
  createTask: (columnId:Id )=>void
  task:Task[]
}

function ColumnContainer(props: IProps) {
  // Destructuring || coming from kanbanBoard.tsx
  const { column, deleteColumn, updateColumn,createTask, task } = props;

  const [editMode, setEditMode] = useState(false);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  //dragging for skeleton
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col opacity-60"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col "
    >
      <div className="flex gap-2">
        {/* Main title */}
        <div
          {...attributes}
          {...listeners}
          onClick={() => {
            setEditMode(true);
          }}
          className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md p-3 font-bold border-columnBackgroundColor border-4 flex items-center w-full justify-between"
        >
          {/* How many items in the box vi*/}
          <div className="flex justify-center items-center px-2 py-1 text-sm">
            0
          </div>
          <div>
            {!editMode && column.title}
            {editMode && (
              <input
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                autoFocus
                onBlur={() => {
                  setEditMode(false);
                }}
                onKeyDown={(e) => {
                  if (e.key !== "Enter") return;
                  setEditMode(false);
                }}
              />
            )}
          </div>
          <button
            onClick={() => {
              deleteColumn(column.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow">
        {task.map(tasks=>(
          <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto"  key={tasks.id}>{tasks.content}</div>
        ))}
      </div>
      {/* Column footer */}
      <button onClick={()=>{
        createTask(column.id)
      }} className="bg-mainBackgroundColor hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
        AddTask
      </button>
    </div>
  );
}

export default ColumnContainer;
