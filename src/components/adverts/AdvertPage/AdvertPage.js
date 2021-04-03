import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import { getAdvert, deleteAdvert } from '../../../api/adverts';
import Layout from '../../layout';
import { ConfirmationButton } from '../../shared';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  const [error, setError] = React.useState(null);
  const [advert, setAdvert] = React.useState(null);

  React.useEffect(() => {
    getAdvert(advertId).then(setAdvert).catch(setError);
  }, [advertId]);

  const handleDeleteConfirm = () => {
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
      <div>
        {JSON.stringify(advert)}
        <ConfirmationButton
          confirmation="Are you sure?"
          onConfirm={handleDeleteConfirm}
        >
          Delete
        </ConfirmationButton>
      </div>
    </Layout>
  );
}

export default AdvertPage;
