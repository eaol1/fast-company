import PropTypes from "prop-types";

import React, { useProfessions } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);
  return (
    <>
      {!isLoading ? <p>{prof.name}</p> : "loading..."}
    </>
  );
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
