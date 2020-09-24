import React from 'react';
import BreakfastContainer from '../../containers/breakfast/BreakfastContainer';
import BreakfastMenuContainer from '../../containers/breakfast/BreakfastMenuContainer';

const Breakfast = ({ match }) => {
    const { name } = match.params;
    const check = name !== 'menu' && name !== 'configure';

    return <>{check ? <BreakfastContainer /> : <BreakfastMenuContainer />}</>;
};

export default Breakfast;
