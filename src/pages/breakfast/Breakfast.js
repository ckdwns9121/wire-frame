import React from 'react';
import BreakfastContainer from '../../containers/breakfast/BreakfastContainer';
import BreakfastMenuContainer from '../../containers/breakfast/BreakfastMenuContainer';

const Breakfast = ({match}) => {
    console.log(match.params);
    const {name} = match.params;
     console.log(name);
    let check = true;
    if( name !=='menu' || name !=='configure'){
        check = false;
    }
    return (
            <>
                {check? 
                <BreakfastContainer/> :
                <BreakfastMenuContainer/>
                }
            </>
    );
};

export default Breakfast;
