const timezoneDictionary = {
  Eastern: 'America/New_York',
  Central: 'America/Chicago',
  Mountain: 'America/Denver',
  Pacific: 'America/Los_Angeles',
  Alaskan: 'America/Anchorage',
  Hawaiian: 'America/Adak',
};

export const getTimezones = () => Object.keys(timezoneDictionary);

export const timezoneToCityViewDictionary = timezone =>
  timezoneDictionary[timezone] || 'Not supported';

export const cityToTimezoneViewDictionary = city =>
  getTimezones().filter(tz => timezoneDictionary[tz] === city).toString() || 'Not supported';
