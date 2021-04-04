import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import AdvertsList from './AdvertsList';
import { getAdverts } from '../../../api/adverts';
import { defaultFilters, filterAdverts, isFiltered } from './filters';
import EmptyList from './EmptyList';

import storage from '../../../utils/storage';

function AdvertsPage() {
  const [error, setError] = React.useState(null);
  const [adverts, setAdverts] = React.useState([]);
  const [filters, setFilters] = React.useState(
    () => storage.get('filters') || defaultFilters
  );

  React.useEffect(() => {
    getAdverts().then(setAdverts).catch(setError);
  }, []);

  React.useEffect(() => {
    storage.set('filters', filters);
  }, [filters]);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <Layout>
      {/* TODO: create a form */}
      <button
        onClick={() => setFilters({ ...defaultFilters, tags: ['motor'] })}
      >
        Filter
      </button>
      <button onClick={() => setFilters(defaultFilters)}>Reset filters</button>
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList isFiltered={isFiltered(filters)} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
