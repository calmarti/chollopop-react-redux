import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../layout";
import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
// import { getAdverts } from "../service";
import { defaultFilters, filterAdverts } from "./filters";
// import useQuery from "../../../hooks/useQuery";
import { loadAdverts } from "../../../store/actions";
import { advertsSelector } from "../../../store/selectors";

const getFilters = () => storage.get("filters")  || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage() {
  // const { isLoading, error, data: adverts = [] } = useQuery(getAdverts);
  const [filters, setFilters] = useState(getFilters); //TODO: ¿llevar los filters a redux?


  const dispatch = useDispatch();

  //TODO: extraer el custom hook a un fichero en /hooks
  //TODO: arreglar TODAS las funcionalidades de la primera práctica, por ejemplo aquí arreglar el onSubmit en FiltersForm
  //(por alguna razón se ejecuta sin presionar el botón 'Filter')
  
  useEffect(() => {    //TODO: readaptar
    saveFilters(filters);
  }, [filters]);

  
  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]); //TODO: OJO con esta dependencia, si da problemas luego quitarla


  const useLoadAdverts = () => {    //TODO: llevar a /hooks o a /react-redux-hooks
    const adverts = useSelector(advertsSelector);
    return adverts;
  };

  const adverts = useLoadAdverts();



  // if (error?.statusCode === 401) {
  //   return <Redirect to="/login" />;
  // }

  const filteredAdverts = filterAdverts(adverts, filters);
  console.log("filters ", filters);
  console.log("adverts", adverts);
  console.log("filteredAdverts", filteredAdverts);

  return (
    <Layout>
      {adverts.length > 0 && (
        <FiltersForm
      
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </Layout>
  );
}

export default AdvertsPage;
