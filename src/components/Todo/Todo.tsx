import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { Context } from "../../context/Provider";
import toast from "react-hot-toast";

interface TodoObj {
  id: number;
  text: string;
  isDone: false;
}

interface isEditState {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IsEditIdStae {
  isEditId: number;
  setIsEditId: React.Dispatch<React.SetStateAction<number>>;
}

const Todo = () => {
  const [isEdit, setIsEdit] = useState<isEditState | boolean>(false);
  const [isEditId, setIsEditId] = useState<IsEditIdStae | number>(0);

  const [newText, setNewText] = useState<string>("");
  const [checkText, setCheckText] = useState<string>(newText);

  const context = useContext(Context);

  if (!context) {
    throw new Error("CountContext should be used inside CountProvider");
  }

  const { state, dispatch } = context;

  const data = state.todos;
  const title = data.length;

  const deleteItem = (id: number): void => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success("Deleted!");
        dispatch({ type: "REMOVE", payload: id });
      }
    });
  };

  const editItem = (id: number): void => {
    setIsEditId(id);
    setIsEdit(!isEdit);
  };
  const saveEdit = (id: number, text: string): void => {
    setIsEdit(!isEdit);

    if (text === checkText) {
      Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save changes!",
      }).then((result) => {
        if (result.isConfirmed) {
          toast.success("Saved!");
          dispatch({ type: "EDIT", payload: { id, text } });
        } else {
          setIsEdit(!isEdit);
        }
      });
    }
  };

  return (
    <div className="">
      <h2 className="text-white text-[16px] leading-[19px] mb-[17px]">
        Tasks to do - {title}
      </h2>
      <ul className="flex flex-col gap-4">
        {data.map((todo: TodoObj) =>
          isEdit && todo.id === isEditId ? (
            <li
              key={todo.id}
              className="bg-primary rounded-[10px] flex py-[19px] px-[20px] justify-between items-center"
            >
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  setNewText(e.target.value);
                  setCheckText(e.target.value);
                }}
                className="bg-transparent border-none text-white outline-none placeholder:text-inputColor w-full"
                type="text"
                placeholder="Editing ..."
                defaultValue={todo.text}
                required
              />
              <button
                onClick={(): void => {
                  setCheckText(newText);
                  saveEdit(todo.id, newText);
                  setIsEdit(!isEdit);
                }}
                className="bg-violetColor rounded-[8px] text-focusedColor text-[16px] text-semibold py-[4px] px-[10px] hover:bg-focusedColor transition-all duration-300  ml-[10px] hover:text-violetColor"
              >
                Edit
              </button>
            </li>
          ) : (
            <li
              key={todo.id}
              className="bg-primary rounded-[10px] flex py-[20px] px-[20px] justify-between items-center"
            >
              <p
                onClick={(): void => editItem(todo.id)}
                className="text-violetColor text-[16px]"
              >
                {todo.text}
              </p>
              <div className="flex items-center">
                <button
                  onClick={(): void => {
                    dispatch({
                      type: "DONE",
                      payload: { id: todo.id, text: todo.text },
                    });
                    toast.success("Marked as done!");
                  }}
                  className="w-[30px] h-[30px] bg-no-repeat bg-center bg-[url('/src/assets/check.svg')] mr-[10px]"
                ></button>
                <button
                  onClick={(): void => deleteItem(todo.id)}
                  className="w-[30px] h-[30px] bg-no-repeat bg-center bg-[url('/src/assets/delete.svg')]"
                ></button>
              </div>
            </li>
          )
        )}
        {data.length === 0 && (
          <li className="bg-primary rounded-[10px] flex py-[17px] px-[20px] justify-between items-center">
            <p className="text-violetColor mx-auto text-[20px] font-semibold">
              No tasks to do
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Todo;
