import shortid from 'shortid';

export const keyedObjectAdapter = object => Object.assign(
  {},
  object,
  { key: object.key ? object.key : shortid.generate() },
);

export const unkeyedObjectAdapter = (object) => {
  const unkeyedObject = Object.assign({}, object);
  delete unkeyedObject.key;
  return unkeyedObject;
};

export const fullNameAdapter = attributes =>
  ['first_name', 'middle_name', 'last_name']
    .filter(key => attributes[key])
    .map(key => attributes[key])
    .join(' ');

export const suggestionAdapter = (id, value) => ({ id, value });

export const etcReportListAdapter = etcModelList =>
  etcModelList.map((e) => {
    const mtdSumCost = parseFloat(e.attributes.mtd.cost) + parseFloat(e.attributes.projected.cost);
    const mtdSumPassengers =
      parseFloat(e.attributes.mtd.passengers) + parseFloat(e.attributes.projected.passengers);
    return {
      id: e.id,
      name: e.attributes.name,
      ytd_soc: e.attributes.ytd.cost,
      ytd_passengers: e.attributes.ytd.passengers,
      mtd_soc: e.attributes.mtd.cost,
      mtd_passengers: e.attributes.mtd.passengers,
      mtd_projected_soc: e.attributes.projected.cost,
      mtd_projected_passengers: e.attributes.projected.passengers,
      mtd_total_soc: mtdSumCost,
      mtd_total_passengers: mtdSumPassengers,
      mtd_total_average: mtdSumPassengers > 0 ? Math.round(mtdSumCost / mtdSumPassengers) : 0,
    };
  });
