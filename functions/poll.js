import axios from 'axios';
import parse from 'node-html-parser';

const getHolidays = async (url) => {
  const response = await axios.get(url);
  const root = parse(response.data);
  return root.querySelectorAll('span.evcal_desc2.evcal_event_title');
};

export const handler = async () => {
  const holidays = await getHolidays('https://nationaldaycalendar.com/what-day-is-it/');

  return {
    statusCode: 200,
    body: `Today's cringe time: 1h ${holidays.map((a, i) => `answer${i + 1}: ${a.text}`).join(' ')}`,
  };
};
