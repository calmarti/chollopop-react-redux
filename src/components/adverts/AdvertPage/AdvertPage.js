import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../layout";
import AdvertDetail from "./AdvertDetail";
import { loadAdvertSelector, uiSelector } from "../../../store/selectors";
import { loadAdvert, deleteAdvert } from "../../../store/actions";
import T from "prop-types";

function AdvertPage({ advert, ui, getAdvert, handleDelete }) {
  const { advertId } = useParams();
  const { error, isLoading } = ui;
 

  useEffect(() => {
    getAdvert();
  }, [getAdvert]);

  if (error?.statusCode === 401) {
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


AdvertPage.propTypes = {
  ui: T.object.isRequired,        
  getAdvert: T.func.isRequired,
  handleDelete: T.func.isRequired,
}


const mapStateToProps = (state, ownProps) => {
  return {
    advert: loadAdvertSelector(state, ownProps.match.params.advertId),
    ui: uiSelector(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAdvert: () => dispatch(loadAdvert(ownProps.match.params.advertId)),
    handleDelete: () => dispatch(deleteAdvert(ownProps.match.params.advertId)),
  };
};

const ConnectedAdvertPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertPage);

export default ConnectedAdvertPage;
