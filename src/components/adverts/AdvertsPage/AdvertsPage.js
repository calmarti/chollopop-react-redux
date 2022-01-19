import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../layout";
import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
import { defaultFilters, filterAdverts } from "./filters";
import { loadAdverts } from "../../../store/actions";
import { loadAdvertsSelector } from "../../../store/selectors";

const getFilters = () => storage.get("filters")  || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage() {
  const [filters, setFilters] = useState(getFilters); //TODO: ¿llevar los filters a redux?


  const dispatch = useDispatch();

  
  useEffect(() => {   
    saveFilters(filters);
  }, [filters]);

  
  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]); 


  const useLoadAdverts = () => {    //TODO: llevar a /hooks o a /react-redux-hooks o rehacer la conexión a redux con 'connect'
    const adverts = useSelector(loadAdvertsSelector);
    return adverts;
  };

  const adverts = useLoadAdverts();


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
