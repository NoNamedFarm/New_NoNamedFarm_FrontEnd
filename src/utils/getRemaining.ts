export const getRemaining = (date: Date): string => {
  const gap = date.getTime() - new Date().getTime();

  const hour = Math.ceil((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const min = Math.ceil((gap % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.ceil((gap % (1000 * 60)) / 1000);

  return `${hour} 시간 ${min} 분 ${sec} 초`;
};
