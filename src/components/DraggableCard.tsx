import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 100%;
  background-color: lightgray;
  color: black;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

const DraggableCard = ({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) => {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onClick = (toDoId: number) => {
    const deleteBoard = toDos[boardId].filter((item) => item.id !== toDoId);
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: deleteBoard,
      };
    });
  };

  return (
    <Draggable key={toDoId + ""} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <DeleteBtn onClick={() => onClick(toDoId)}>x</DeleteBtn>
        </Card>
      )}
    </Draggable>
  );
};
export default React.memo(DraggableCard);
