import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { styled } from "@reearth/services/theme";

import Item from "./Item";

type Props<Item extends { id: string } = { id: string }> = {
  uniqueKey: string;
  items: Item[];
  getId: (item: Item) => string;
  onItemDrop(item: Item, targetIndex: number): void;
  renderItem: (item: Item, index: number) => ReactNode;
  gap: number;
};

function DragAndDropList<Item extends { id: string } = { id: string }>({
  uniqueKey,
  items,
  onItemDrop,
  getId,
  renderItem,
  gap,
}: Props<Item>) {
  const [movingItems, setMovingItems] = useState<Item[]>(items);

  useEffect(() => {
    setMovingItems(items);
  }, [items]);

  const onItemMove = useCallback((dragIndex: number, hoverIndex: number) => {
    setMovingItems(old => {
      const items = [...old];
      items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, old[dragIndex]);
      return items;
    });
  }, []);

  const onItemDropOnItem = useCallback(
    (index: number) => {
      const item = movingItems[index];
      if (items[index].id === item.id) return;
      item && onItemDrop(movingItems[index], index);
    },
    [items, movingItems, onItemDrop],
  );

  const onItemDropOutside = useCallback(() => {
    setMovingItems(items);
  }, [items]);

  return (
    <SWrapper gap={gap}>
      {movingItems.map((item, i) => {
        const id = getId(item);
        return (
          <Item
            itemGroupKey={uniqueKey}
            key={id}
            id={item.id}
            index={i}
            onItemMove={onItemMove}
            onItemDropOnItem={onItemDropOnItem}
            onItemDropOutside={onItemDropOutside}>
            {renderItem(item, i)}
          </Item>
        );
      })}
    </SWrapper>
  );
}

export default DragAndDropList;

const SWrapper = styled.div<Pick<Props, "gap">>`
  display: flex;
  flex-direction: column;
  ${({ gap }) => `gap: ${gap}px`}
`;
