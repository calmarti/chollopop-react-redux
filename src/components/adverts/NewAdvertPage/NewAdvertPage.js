import React from "react";
import T from "prop-types";
import { Redirect } from "react-router-dom";

import { createAdvert } from "../service";
import Layout from "../../layout";
import NewAdvertForm from "./NewAdvertForm";
import useMutation from "../../../hooks/useMutation";

function NewAdvertPage({ history }) {
  // const mutation = useMutation(createAdvert);

  // const onSubmit = newAdvert => {
  //   mutation
  //     .execute(newAdvert)
  //     .then(({ id }) => history.push(`/adverts/${id}`));
  // };

  // if (mutation.error?.statusCode === 401) {    //TODO: adaptar esto
  //   return <Redirect to="/login" />;
  // }

  return (
    <Layout>
      <NewAdvertForm  />
    </Layout>
  );
}


NewAdvertPage.propTypes = {
  history: T.shape({
    push: T.func.isRequired,
  }).isRequired,
};

export default NewAdvertPage;
