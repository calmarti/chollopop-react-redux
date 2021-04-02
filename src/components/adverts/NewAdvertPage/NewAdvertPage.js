import Layout from '../../layout';
import NewAdvertForm from './NewAdvertForm';

import { createAdvert } from '../../../api/adverts';

function NewAdvertPage() {
  const handleSubmit = newAdvert => {
    createAdvert(newAdvert);
  };

  return (
    <Layout>
      <NewAdvertForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default NewAdvertPage;
