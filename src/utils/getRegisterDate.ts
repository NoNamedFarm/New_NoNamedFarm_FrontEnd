export const getRegisterDate = (date: Date): string => {
  const now = new Date().getTime() - date.getTime();

  const day = Math.floor(now / (1000 * 60 * 60 * 24));

  return `${day}일`;
};
