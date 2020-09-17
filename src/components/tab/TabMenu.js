import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TabMenu.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    tabs: {
        width: '100%',
        maxWidth: '1374px',
        minHeight: '40px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderBottom:"2px solid black",
    },
}));

const TabMenu =({tabs,index,onChange}) =>{

    const classes = useStyles();

    const history = useHistory();

    const onClickTab = (url) => {
        history.push(url) 
    };

    const tabList = tabs.map((tab) => (
        <Tab
            label={tab.name}
            key={tab.name}
            className={styles['tab-item']}
            onClick={() => onClickTab(tab.url)}
        />
    ));
    ;
    return (
        <Tabs
            value={index}
            onChange={onChange}
            TabIndicatorProps={{
                style: {
                    backgroundColor: 'transparent',
                    height:'46px',
                    border: "2px solid black",
                    borderBottom:"0px solid black",
                    boxSizing:"border-box"

                },
            }}
            className={classes.tabs}
            centered
        >
            {tabList}
        </Tabs>
    );
}



TabMenu.defaultProps = {
    tabs: null,
    index: 0,
    isPush : false,
    onChange: () => console.warn(null),
};

export default TabMenu;