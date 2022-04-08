import axios from 'axios';
import parse from 'node-html-parser';

const getHolidays = async (url) => {
  const response = await axios.get(url);
  const root = parse(response.data);

  return {
    today: extractHolidays(root, false),
    tomorrow: extractHolidays(root, true),
  };
};

const extractHolidays = (root, tomorrow) => {
  let selector = '.current-day';
  if (tomorrow) selector += ' + li';
  const holidays = root.querySelectorAll(`${selector} li a`).map((e) => toTitleCase(e.text));
  const day = root.querySelector(`${selector} .title`).text.replace('Days', '').trim();

  return {
    day,
    holidays,
  };
};

const toTitleCase = (text) => text.replace(/\w\S*/g, (s) => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase());

export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(await getHolidays('https://nationaldaycalendar.com/')),
  };
};
