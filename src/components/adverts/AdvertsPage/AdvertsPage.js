import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../layout";
import FiltersForm from "./FiltersForm";
import AdvertsList from "./AdvertsList";
import EmptyList from "./EmptyList";
import storage from "../../../utils/storage";
import { defaultFilters, filterAdverts } from "./filters";
import { loadAdverts } from "../../../store/actions";
import useLoadAdverts from "../../../hooks/react-redux/useLoadAdverts";

const getFilters = () => storage.get("filters") || defaultFilters;
const saveFilters = (filters) => storage.set("filters", filters);

function AdvertsPage() {
  const [filters, setFilters] = useState(getFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  useEffect(() => {
    dispatch(loadAdverts());
  }, [dispatch]);

  const { adverts, error, isLoading } = useLoadAdverts();

  const filteredAdverts = filterAdverts(adverts, filters);


  return (
    <Layout>
      {isLoading && <p>Loading ... </p>}
      {error && <div style={{ color: "red" }}>{error.message}</div>}

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
