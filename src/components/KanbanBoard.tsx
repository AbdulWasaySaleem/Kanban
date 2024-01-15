import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useMemo } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Column } from "../Model/Type";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragStartEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";


function KanbanBoard() {
  const [column, setColumn] = useState<Column[]>([]); //for colum || vertical box i
  const [active, setActive] = useState<Column | null >(null) //Draging active
  console.log(column);
  const columnId = useMemo(()=>column.map((col)=>col.id), [column])

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext onDragStart={onDragStart}>
      <div className="m-auto flex gap-2">
        {/* mapping through to add diffrent col for todo, inProgress and Ended iv*/}
        <div className="flex gap-2">
        <SortableContext items={columnId}>
          {column.map((col) => (
            <div><ColumnContainer key={col.id} column={col} deleteColumn={deleteColumn}/></div>
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
      </DndContext>
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      //colums so we can add rest stuff inside(todo/progrexx/ended etc) ii
      id: generateId(),
      title: `Column ${column.length + 1}`,
    };
    setColumn([...column, columnToAdd]);
  }
  //deleting col
  function deleteColumn(id:Id){
    const filterColumn = column.filter((col)=>col.id !== id)
    setColumn(filterColumn)
  }
  //dragging
  function onDragStart(event:DragStartEvent){
    console.log("first", event)
    if(event.active.data.current?.type==="Column"){
      setActive(event.active.data.current.type)
      return;
    }
  }
}

//generating random id iii
function generateId() {
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
