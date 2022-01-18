// import { useCallback } from "react";
import { useEffect, useCallback } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector, useStore } from "react-redux";
import Layout from "../../layout";
import AdvertDetail from "./AdvertDetail";
import { /* getAdvert,  */ deleteAdvert } from "../service";
// import useQuery from "../../../hooks/useQuery";
import useMutation from "../../../hooks/useMutation";
import {
  advertSelector,
  advertsSelector,
  uiSelector,
} from "../../../store/selectors";
import { loadAdvert } from "../../../store/actions";

//TODO: Opciones:
//0.- crear un 'advert' por defecto que permita el primer renderizado: esto arroja SIEMPRE el loop inifito de dispatches
//1.- ver resto de la clase 4 a ver si me ilumina
//2.- useStore y luego getStore para leer el state directamente
//3.- stackoverflow y afines

function AdvertPage({ advert, ui,  getAdvert, history }) {
  const { advertId } = useParams();
  const { error, isLoading } = ui
  console.log(advertId);
  //const advertId = match.params.advertId;
  // const history = useHistory();

  // dispatch(loadAdvert(match.params.advertId)); //loop infinito del dispatch ó sino devuelve el state anterior (2 adverts o ninguno)

  // PRESINCIDIBLE:
  // const useLoadAdvert = () => {
  //   dispatch(loadAdvertCallback(advertId));
  //   // const advert = useSelector((state) => state.adverts); //por alguna razón está leyendo tarde el state o no lo cambia!
  //   // const { error, isLoading } = useSelector((state) => state.ui);
  //   // return { advert, error, isLoading };
  //   const store = useStore();
  //   console.log('getState: ', store.getState());
  // };


  useEffect(() => {
    getAdvert();
  }, [getAdvert]);

  // useEffect(() => {
  //   dispatch(loadAdvert(advertId));
  // }, [dispatch, advertId]);

  // const advert = useSelector(advertsSelector);
  // const { isLoading, error } = useSelector(uiSelector);




  // const getAdvertById = useCallback(() => getAdvert(advertId), [advertId]);
  // const { isLoading, error, data: advert } = useQuery(getAdvertById);

  const mutation = useMutation(deleteAdvert);


  //TODO: llevar el borrado a redux

  const handleDelete = () => {
    mutation.execute(advertId).then(() => history.push("/"));
  };


  if (error?.statusCode === 401 /* || mutation.error?.statusCode === 401 */) {
    return <Redirect to="/login" />;
  }

  if (error?.statusCode === 404) {    
    return <Redirect to="/404" />;
  }

  return (
    <Layout>
      {advert && <AdvertDetail {...advert} /* onDelete={handleDelete} */ />}
    </Layout>
  );
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     advert: advertsSelector(state),
//     ui: uiSelector(state)
//   };
// };

const mapStateToProps = (state, ownProps) => {
  return {
    advert: advertSelector(state, ownProps.match.params.advertId),
    ui: uiSelector(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAdvert: () =>
      dispatch(loadAdvert(ownProps.match.params.advertId)),
  };
};

const ConnectedAdvertPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvertPage);

export default ConnectedAdvertPage;

// export default AdvertPage;
