export function get2024RandomDate(): Date {
  const start = new Date(2024, 0, 1);
  const end = new Date(2024, 11, 31);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

export function getRandomQuantity(): number {
  return Math.floor(Math.random() * 100) + 1;
}
