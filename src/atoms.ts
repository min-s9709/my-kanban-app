import { atom } from "recoil";

export const saveBoardItem = (boardItem: IToDoState) => {
  localStorage.setItem("toDoBoard", JSON.stringify(boardItem));
};

export const loadBoardItem = () => {
  const boardTask = localStorage.getItem("toDoBoard");
  if (boardTask) {
    return JSON.parse(boardTask);
  } else {
    return [];
  }
};

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    "To Do":
      loadBoardItem()["To Do"] !== undefined ? loadBoardItem()["To Do"] : [],
    Doing:
      loadBoardItem()["Doing"] !== undefined ? loadBoardItem()["Doing"] : [],
    Done: loadBoardItem()["Done"] !== undefined ? loadBoardItem()["Done"] : [],
  },
});
