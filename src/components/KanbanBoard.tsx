import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Column } from "../Model/Type";


function KanbanBoard() {
  //for colum || vertical box 
  const [column, setColumn] = useState<Column[]>([]);
  console.log(column)

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto">
        <button
          onClick={() => {
            createNewColumn();
          }}
          className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-blue-600 hover:ring-2 flex gap-4"
        >
          Add column <IoIosAddCircle />
          
        </button>
      </div>
    </div>
  );

  function createNewColumn() {
    const columnToAdd: Column = {
      //colums so we can add rest stuff inside(todo/progrexx/ended etc)
      id: generateId(),
      title: `Column ${column.length + 1}`
    };
    setColumn([...column, columnToAdd]);
  }
  
}

//generating random id 
function generateId(){
  return Math.floor(Math.random()*10001)
}


export default KanbanBoard;
