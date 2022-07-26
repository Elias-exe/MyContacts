import { useState, useEffect, useCallback } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

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
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter(
      (message) => message.id !== id,
    ));
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
