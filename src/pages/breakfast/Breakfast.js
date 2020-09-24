import React from 'react';
import BreakfastContainer from '../../containers/breakfast/BreakfastContainer';
import BreakfastMenuContainer from '../../containers/breakfast/BreakfastMenuContainer';

const Breakfast = ({match}) => {
    console.log(match.params);
    const {name} = match.params;
     console.log(name);
    return (
            <>
                {name!=='menu' ? 
                <BreakfastContainer/> :
                <BreakfastMenuContainer/>
                }
            </>
    );
};

export default Breakfast;
