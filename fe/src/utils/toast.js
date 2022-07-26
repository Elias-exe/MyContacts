export default function toast({ type, text, duration }) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
      duration,
    },
  });
  document.dispatchEvent(event);
}
