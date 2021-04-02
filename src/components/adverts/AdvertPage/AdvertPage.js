import { useParams } from 'react-router-dom';

import Layout from '../../layout';

function AdvertPage() {
  const { advertId } = useParams();
  return <Layout>AdvertPage {advertId}</Layout>;
}

export default AdvertPage;
