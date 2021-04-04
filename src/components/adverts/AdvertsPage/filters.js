export const saleFilter = {
  all: 'all',
  sell: 'sell',
  buy: 'buy',
};

export const defaultFilters = {
  name: '',
  price: [],
  sale: saleFilter.all,
  tags: [],
};

const filterByName = filter => ({ name }) =>
  !filter || new RegExp(filter, 'gi').test(name);

const filterByPrice = filter => ({ price }) => {
  if (!filter.length) {
    return true;
  }
  const [min, max] = filter;
  if (!max) {
    return price >= min;
  }
  return max >= price >= min;
};

const filterBySale = filter => ({ sale }) =>
  [saleFilter.all, sale ? saleFilter.sell : saleFilter.buy].includes(filter);

const filterByTags = filter => ({ tags }) =>
  !filter.length || filter.every(tag => tags.includes(tag));

export const filterAdverts = (adverts, filters) =>
  adverts
    .filter(filterByName(filters.name))
    .filter(filterByPrice(filters.price))
    .filter(filterBySale(filters.sale))
    .filter(filterByTags(filters.tags));

export const isFiltered = filters =>
  JSON.stringify(filters) !== JSON.stringify(defaultFilters);
