import React, {
    useContext,
    useEffect,
    useState
} from "react";

import PropTypes from "prop-types";
import { toast } from "react-toastify";

import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);
  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getQuality = (id) => {
    return qualities.find(q => q._id === id);
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  };

  return (
    <QualityContext.Provider value={{ isLoading, qualities, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
