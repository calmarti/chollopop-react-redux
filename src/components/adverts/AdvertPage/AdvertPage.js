import React from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import Layout from '../../layout';
import AdvertDetail from './AdvertDetail';
import { getAdvert, deleteAdvert } from '../service';
import useQuery from '../../../hooks/useQuery';
import useMutation from '../../../hooks/useMutation';

function AdvertPage() {
  const { advertId } = useParams();
  const history = useHistory();
  const getAdvertById = React.useCallback(
    () => getAdvert(advertId),
    [advertId],
  );
  const { isLoading, error, data: advert } = useQuery(getAdvertById);
  const mutation = useMutation(deleteAdvert);

  const handleDelete = () => {
    mutation.execute(advertId).then(() => history.push('/'));
  };

  if (error?.statusCode === 401 || mutation.error?.statusCode === 401) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} onDelete={handleDelete} />}
    </Layout>
  );
}

export default AdvertPage;
