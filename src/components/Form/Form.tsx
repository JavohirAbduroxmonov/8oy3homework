import { useContext, useState, useRef } from "react";
import { Context } from "../../context/Provider";
import toast from "react-hot-toast";

interface TextState {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Form = () => {
  const [text, setText] = useState<TextState | string>("");
  const context = useContext(Context);
  const inputRef = useRef<null | HTMLInputElement>(null);

  if (!context) {
    throw new Error("CountContext should be used inside CountProvider");
  }

  const { dispatch } = context;

  const notify = (): void => {
    toast.success("Task added successfully");
  };

  const handleSubmit = (): void => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    dispatch({ type: "ADD", payload: text });

    toast.success("Task added successfully");
  };

  return (
    <div className="flex">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setText(e.target.value)
        }
        ref={inputRef}
        className="bg-transparent border-[2px] border-violetColor rounded-[10px] w-96 h-[40px] pt-[12px] pb-[10px] px-[20px] text-white outline-none placeholder:text-inputColor mr-[10px] focus:border-focusedColor"
        type="text"
        placeholder="Add a new task"
        required
      />
      <button
        type="submit"
        onClick={(): void => {
          handleSubmit(), notify;
        }}
        className="bg-violetColor rounded-[10px] w-[40px] h-[40px] p-[8px] bg-no-repeat bg-center bg-[url('/src/assets/add.svg')] hover:bg-focusedColor transition-all duration-300"
      ></button>
    </div>
  );
};

export default Form;
