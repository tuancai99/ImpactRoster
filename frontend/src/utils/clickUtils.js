export const getClickCount = (id) => {
  const clickCount = sessionStorage.getItem(`${id}`);

  if (clickCount !== null) {
    const storedNumberAsInt = parseInt(clickCount, 10);
    const clickUpdate = storedNumberAsInt + 1;
    sessionStorage.setItem(`${id}`, clickUpdate);
    return clickUpdate;
  } else {
    sessionStorage.setItem(`${id}`, 1);
    return 1;
  }
};
