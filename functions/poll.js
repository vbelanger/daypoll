import axios from 'axios';
import parse from 'node-html-parser';

const getHolidays = async (url) => {
  const response = await axios.get(url);
  const root = parse(response.data);
  return root.querySelectorAll('span.evcal_desc2.evcal_event_title').map((e) => e.text);
};

export const handler = async () => {
  const today = await getHolidays('https://nationaldaycalendar.com/what-is-today/');
  const tomorrow = await getHolidays('https://nationaldaycalendar.com/tomorrow/');

  return {
    statusCode: 200,
    body: JSON.stringify({
      today,
      tomorrow,
    }),
  };
};
