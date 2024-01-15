import { Column } from "../Model/Type";

interface IProps {
  column: Column;
}

function ColumnContainer(props: IProps) {
  //destrturing || coming from kanbanBoard.tsx v
  const { column } = props;

  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col">
      {/* Main title */}
      <div className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md p-3 font-bold border-columnBackgroundColor border-4">
      {column.title}

      </div>
      {/* Column task container */}
      <div className="flex flex-grow">Content</div>
      {/* Column footer  */}
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;
