import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import { createAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

function NewAdvertPage() {
  const history = useHistory();
  const [error, setError] = React.useState(null);

  const handleSubmit = newAdvert => {
    createAdvert(newAdvert)
      .then(({ id }) => history.push(`/adverts/${id}`))
      .catch(setError);
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
