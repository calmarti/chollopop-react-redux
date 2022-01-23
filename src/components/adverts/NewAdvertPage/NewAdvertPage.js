import React from "react";
import T from "prop-types";
import Layout from "../../layout";
import NewAdvertForm from "./NewAdvertForm";


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
