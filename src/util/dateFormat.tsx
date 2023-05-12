export const dateFormat = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "GMT",
  }).format(date);
};
