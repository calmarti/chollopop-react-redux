// import { useCallback } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "../../layout";
import AdvertDetail from "./AdvertDetail";
import { /* getAdvert,  */ deleteAdvert } from "../service";
// import useQuery from "../../../hooks/useQuery";
import useMutation from "../../../hooks/useMutation";
import { advertSelector, uiSelector } from "../../../store/selectors";

function AdvertPage({ advert, match, isLoading, error }) {
  //const { advertId } = useParams();
  const advertId = match.params.advertId;
  const history = useHistory();

  // const getAdvertById = useCallback(() => getAdvert(advertId), [advertId]);
  // const { isLoading, error, data: advert } = useQuery(getAdvertById);

  const mutation = useMutation(deleteAdvert);

  const handleDelete = () => {
    mutation.execute(advertId).then(() => history.push("/"));
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

const mapStateToProps = (state, ownProps) => {
  return {
    advert: advertSelector(state, ownProps.match.params.advertId),
    isLoading: uiSelector(state).isLoading,
    error: uiSelector(state).error,
  };
};

const ConnectedAdvertPage = connect(mapStateToProps)(AdvertPage);

export default ConnectedAdvertPage;
