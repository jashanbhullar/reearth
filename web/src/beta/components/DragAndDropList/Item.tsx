import type { Identifier } from "dnd-core";
import type { FC, ReactNode } from "react";
import { memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import { styled } from "@reearth/services/theme";

type DragItem = {
  index: number;
  id: string;
  type: string;
};

type Props = {
  itemGroupKey: string;
  id: string;
  index: number;
  onItemMove: (dragIndex: number, hoverIndex: number) => void;
  onItemDropOnItem: (dropIndex: number) => void;
  onItemDropOutside: () => void;
  children: ReactNode;
};

const Item: FC<Props> = ({
  itemGroupKey,
  id,
  children,
  index,
  onItemMove,
  onItemDropOnItem,
  onItemDropOutside,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: itemGroupKey,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Get vertical middle Y
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      onItemMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: itemGroupKey,
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        onItemDropOnItem(item.index);
      } else {
        onItemDropOutside();
      }
    },
  });

  drag(drop(ref));
  return (
    <SItem ref={ref} data-handler-id={handlerId} isDragging={isDragging}>
      {children}
    </SItem>
  );
};

export default memo(Item);

const SItem = styled.div<{ isDragging: boolean }>`
  ${({ isDragging }) => `opacity: ${isDragging ? 0 : 1};`}
  cursor: move;
`;
