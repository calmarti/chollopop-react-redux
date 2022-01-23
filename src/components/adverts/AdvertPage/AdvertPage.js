import { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../layout";
import AdvertDetail from "./AdvertDetail";
import { loadAdvertSelector } from "../../../store/selectors";
import { loadAdvert, deleteAdvert } from "../../../store/actions";
import T from "prop-types";

function AdvertPage({ advert, getAdvert, handleDelete }) {
  useEffect(() => {
    getAdvert();
  }, [getAdvert]);

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
};

const mapStateToProps = (state, ownProps) => {
  return {
    advert: loadAdvertSelector(state, ownProps.match.params.advertId),
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
