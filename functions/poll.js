import axios from 'axios';
import parse from 'node-html-parser';

const getHolidays = async (url) => {
  const response = await axios.get(url);
  const root = parse(response.data);

  return {
    today: extractHolidays(false),
    tomorrow: extractHolidays(true),
  };
};

const extractHolidays = (tomorrow) => {
  const selector = '.current-day';
  if (tomorrow) selector += ' + li';
  const holidays = root.querySelectorAll(`${selector} li a`).map((e) => e.text);
  const day = root.querySelector(`${selector} .title`).text.replace('Days', '').trim();

  return {
    day,
    holidays,
  };
};

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(await getHolidays('https://nationaldaycalendar.com/')),
  };
};
