import React from "react";

import PropTypes from "prop-types";

import { useQualities } from "../../../hooks/useQualities";
import Quality from "./quality";

const QualitiesList = ({ userQualities }) => {
    const { isLoading, getQuality } = useQualities();

    return (
        <>
            {!isLoading ? userQualities.map((id) => {
                const quality = getQuality(id);
                return <Quality key={id} {...quality} />;
            }) : <p>Loading...</p>}
        </>
    );
};

QualitiesList.propTypes = {
    userQualities: PropTypes.array
};

export default QualitiesList;
