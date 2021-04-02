import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { getAdverts } from '../../../api/adverts';
import Layout from '../../layout';

function AdvertsPage() {
  const [error, setError] = React.useState(null);
  const [adverts, setAdverts] = React.useState([]);

  React.useEffect(() => {
    getAdverts().then(setAdverts).catch(setError);
  }, []);

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout>
      <ul>
        {adverts.map(({ id, ...advert }) => (
          <li key={id}>
            <Link to={`/adverts/${id}`}>{JSON.stringify(advert)}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default AdvertsPage;
