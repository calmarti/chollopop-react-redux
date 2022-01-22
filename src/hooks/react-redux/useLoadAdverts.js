import { useSelector } from "react-redux";
import { uiSelector, loadAdvertsSelector } from "../../store/selectors";

const useLoadAdverts = () => {
  const adverts = useSelector(loadAdvertsSelector);
  const { isLoading, error } = useSelector(uiSelector);
  return { adverts, isLoading, error };
};

export default useLoadAdverts;