import { Column, Id } from "../Model/Type";

interface IProps {
  column: Column;
  deleteColumn: (id: Id)=>void;
}

function ColumnContainer(props: IProps) {
  // Destructuring || coming from kanbanBoard.tsx
  const { column, deleteColumn } = props;

  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col ">
      <div className="flex gap-2">
        {/* Main title */}
        <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md p-3 font-bold border-columnBackgroundColor border-4 flex items-center w-full justify-between">
          {/* How many items in the box vi*/}
          <div className="flex justify-center items-center px-2 py-1 text-sm">0</div>
          <div>{column.title}</div>
          <button onClick={()=>{
            deleteColumn(column.id)
          }}>Delete</button>
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
