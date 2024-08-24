import { useContext } from "react";
import { Context } from "../../context/Provider";
import { toast } from "react-hot-toast";

const Done = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("CountContext should be used inside CountProvider");
  }
  const { state, dispatch } = context;

  const data = state.done;
  const title = data.length;

  const unDone = (id: number, text: string): void => {
    dispatch({
      type: "UNDONE",
      payload: { id: id, text: text },
    });
    toast.success("Undone!");
  };

  return (
    <div className="">
      <h2 className="text-white text-[16px] leading-[19px] mb-[17px]">
        Done - {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {data.map((item) => (
          <li
            key={item.id}
            className="bg-primary rounded-[10px] flex py-[20px] px-[20px] justify-between items-center"
          >
            <p
              onClick={(): void => unDone(item.id, item.text)}
              className="text-lightGreen line-through text-[16px]"
            >
              {item.text}
            </p>
          </li>
        ))}
        {data.length === 0 && (
          <li className="bg-primary rounded-[10px] flex py-[16px] justify-between items-center">
            <p className="text-lightGreen mx-auto text-[20px] font-semibold">
              No task has been completed yet
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Done;
