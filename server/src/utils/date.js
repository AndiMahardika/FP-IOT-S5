export const formatDateToIndo = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
  return formattedDate.replace(',', '');
};