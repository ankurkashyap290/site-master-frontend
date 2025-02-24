export default (oldOrderBy, newOrderBy, oldOrder) => {
  let newOrder = oldOrder;

  if (oldOrderBy === newOrderBy) {
    newOrder = (oldOrder === 'asc' ? 'desc' : 'asc');
  }

  return newOrder;
};
