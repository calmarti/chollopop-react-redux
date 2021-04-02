import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import { getAdvert, deleteAdvert } from '../../../api/adverts';
import Layout from '../../layout';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  const [error, setError] = React.useState(null);
  const [advert, setAdvert] = React.useState(null);

  React.useEffect(() => {
    getAdvert(advertId).then(setAdvert).catch(setError);
  }, [advertId]);

  const handleClick = () => {
    deleteAdvert(advertId)
      .then(() => history.push('/'))
      .catch(setError);
  };

  if (error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      <div onClick={handleClick}>{JSON.stringify(advert)}</div>
    </Layout>
  );
}

export default AdvertPage;
