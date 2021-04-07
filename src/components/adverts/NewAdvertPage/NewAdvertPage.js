import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { createAdvert } from '../../../api/adverts';
import usePromise from '../../../hooks/usePromise';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

function NewAdvertPage() {
  const history = useHistory();
  const { isPending: isLoading, error, execute } = usePromise(null);

  const handleSubmit = newAdvert => {
    execute(createAdvert(newAdvert)).then(({ id }) =>
      history.push(`/adverts/${id}`)
    );
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default NewAdvertPage;
