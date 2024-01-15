import { Column, Id } from "../Model/Type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: IProps) {
  // Destructuring || coming from kanbanBoard.tsx
  const { column, deleteColumn } = props;
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

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
          className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md p-3 font-bold border-columnBackgroundColor border-4 flex items-center w-full justify-between"
        >
          {/* How many items in the box vi*/}
          <div className="flex justify-center items-center px-2 py-1 text-sm">
            0
          </div>
          <div>{column.title}</div>
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
      <div className="flex flex-grow">Content</div>
      {/* Column footer */}
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
