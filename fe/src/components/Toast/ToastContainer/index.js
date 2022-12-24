import { useEffect } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text, duration } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </Container>
  );
}
