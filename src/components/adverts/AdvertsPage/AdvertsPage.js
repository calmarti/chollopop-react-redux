import React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '../../layout';
import FiltersForm from './FiltersForm';
import AdvertsList from './AdvertsList';
import EmptyList from './EmptyList';
import storage from '../../../utils/storage';
import useForm from '../../../hooks/useForm';
import { getAdverts } from '../../../api/adverts';
import { defaultFilters, filterAdverts } from './filters';

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = filters => storage.set('filters', filters);

function AdvertsPage() {
  const [error, setError] = React.useState(null);
  const [adverts, setAdverts] = React.useState([]);
  const {
    formValue: filters,
    setFormValue: setFilters,
    handleChange,
  } = useForm(getFilters);

  React.useEffect(() => {
    getAdverts().then(setAdverts).catch(setError);
  }, []);

  React.useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  const filteredAdverts = filterAdverts(adverts, filters);

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
          {...filters}
          prices={adverts.map(({ price }) => price)}
          onChange={handleChange}
          onReset={handleReset}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
