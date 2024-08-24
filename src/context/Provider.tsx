import { createContext, useReducer } from "react";

const initValue = localStorage.getItem("todos_state");
let initState: State;
if (initValue) {
  initState = JSON.parse(initValue);
} else {
  initState = {
    todos: [],
    done: [],
  };
}

interface TodoObj {
  id: number;
  text: string;
  isDone: false;
}
interface DoneObj {
  id: number;
  text: string;
  isDone: true;
}
interface State {
  todos: TodoObj[];
  done: DoneObj[];
}
interface Action {
  type: "ADD" | "REMOVE" | "EDIT" | "DONE" | "UNDONE";
  payload: any;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [
          {
            id: Date.now(),
            text: action.payload,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    case "REMOVE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "EDIT":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }
          return todo;
        }),
      };
    case "DONE":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        done: [
          {
            id: Date.now(),
            text: action.payload.text,
            isDone: true,
          },
          ...state.done,
        ],
      };
    case "UNDONE":
      return {
        ...state,
        done: state.done.filter((todo) => todo.id !== action.payload.id),
        todos: [
          {
            id: Date.now(),
            text: action.payload.text,
            isDone: false,
          },
          ...state.todos,
        ],
      };
    default:
      return state;
  }
};

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}
export const Context = createContext<null | ContextValue>(null);

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export default Provider;
