import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Column } from "../Model/Type";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [column, setColumn] = useState<Column[]>([]); //for colum || vertical box i
  const [active, setActive] = useState<Column | null>(null); //Draging active
  console.log(column);
  const columnId = useMemo(() => column.map((col) => col.id), [column]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // 300px
      },
    })
  );
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-2">
          {/* mapping through to add diffrent col for todo, inProgress and Ended iv*/}
          <div className="flex gap-2">
            <SortableContext items={columnId}>
              {column.map((col) => (
                <div>
                  <ColumnContainer
                    key={col.id}
                    column={col}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                  />
                </div>
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-blue-600 hover:ring-2 flex gap-4"
          >
            Add column <IoIosAddCircle />
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {active && (
              <ColumnContainer
                column={active}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
  
  //colums so we can add rest stuff inside(todo/progrexx/ended etc) ii
  function createNewColumn() {
  const defaultTitle = `Column ${column.length + 1}`;

  // Use the input value if available
  const inputValue = prompt('Enter column title:');
  if (inputValue !== null) {
    const updatedColumn = column.map((col) =>
      col.id === active?.id ? { ...col, title: inputValue.trim() } : col
    );

    setColumn((prevColumns) => {
      // Check if the column already exists and update it
      if (active && column.some((col) => col.id === active.id)) {
        return updatedColumn;
      }

      // Add a new column with the default title if no input is provided
      const columnToAdd: Column = {
        id: generateId(),
        title: inputValue.trim() || defaultTitle,
      };

      return [...prevColumns, columnToAdd];
    });
  }
}

  //deleting col
  function deleteColumn(id: Id) {
    const filterColumn = column.filter((col) => col.id !== id);
    setColumn(filterColumn);
  }
  //updating colum
  function updateColumn(id: Id, title: string) {
    const newColumn = column.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumn(newColumn);
  }
  //dragging
  function onDragStart(event: DragStartEvent) {
    //console.log("first", event)
    if (event.active.data.current?.type === "Column") {
      setActive(event.active.data.current.type);
      return;
    }
  }
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;
    setColumn((column) => {
      const activeColumnIndex = column.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = column.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(column, activeColumnIndex, overColumnIndex);
    });
  }

  function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const newArray = [...array];
    const [item] = newArray.splice(from, 1);
    newArray.splice(to, 0, item);
    return newArray;
  }
}

//generating random id iii
function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
