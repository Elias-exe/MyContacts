import {
  useRef, useCallback, useState, createRef,
} from 'react';

export default function useAnimatedList(initialValue) {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemIds] = useState([]);

  const animatedRefs = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  // const handleAnimationEnd = useCallback((id) => {
  //  setItems((prevState) => prevState.filter((item) => item.id !== id));
  //  setPendingRemovalItemIds(
  //    (prevState) => prevState.filter((itemId) => itemId !== id),
  // );
  // }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
}
