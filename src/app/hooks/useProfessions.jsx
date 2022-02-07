import React, {
    useContext,
    useEffect,
    useState
} from "react";

import PropTypes from "prop-types";
import { toast } from "react-toastify";

import professionService from "../services/profession.service";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);
  const getProfessionsList = async () => {
    try {
      const { content } = await professionService.get();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getProfession = (id) => {
    return professions.find(p => p._id === id);
  };

  const errorCatcher = (error) => {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  };

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};