import axios from 'axios';
import parse from 'node-html-parser';

const getHolidays = async (url) => {
  const response = await axios.get(url);
  const root = parse(response.data);
  const holidays = root.querySelectorAll('span.evcal_desc2.evcal_event_title').map((e) => e.text);
  const day = root.querySelector('.title-info strong').text;

  return {
    day,
    holidays,
  };
};

export const handler = async () => {
  const today = await getHolidays('https://nationaldaycalendar.com/what-day-is-it/');
  const tomorrow = await getHolidays('https://nationaldaycalendar.com/tomorrow/');

  return {
    statusCode: 200,
    body: JSON.stringify({
      today,
      tomorrow,
    }),
  };
};
