import React from "react";
import T from "prop-types";
import { Redirect } from "react-router-dom";

import { createAdvert } from "../service";
import Layout from "../../layout";
import NewAdvertForm from "./NewAdvertForm";
import useMutation from "../../../hooks/useMutation";

function NewAdvertPage() {

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
