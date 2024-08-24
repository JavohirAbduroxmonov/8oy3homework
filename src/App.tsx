import { Form, Todo, Done } from "./components/components.js";
import { useContext, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { Toaster } from "react-hot-toast";
import { Context } from "./context/Provider.js";

interface LoadingState {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const App = () => {
  const [loading, setLoading] = useState<LoadingState | boolean>(true);
  const context = useContext(Context);
  if (!context) {
    throw new Error("CountContext should be used inside CountProvider");
  }

  const { state } = context;

  useEffect(() => {
    localStorage.setItem("todos_state", JSON.stringify(state));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [state]);

  return (
    <>
      {loading ? (
        <HashLoader
          color="#36d7b7"
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <div className="rounded-[20px] bg-boxBg pt-[50px] pb-[55px] pl-[65px] pr-[85px] flex flex-col gap-[60px]">
          <Form />
          <Todo />
          <Done />
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
