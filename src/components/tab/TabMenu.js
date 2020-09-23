import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TabMenu.module.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tabs: {
        width: '100%',
        minHeight: '64px',
        margin: '0 auto',
        backgroundColor: '#fff',
    },
}));

const TabMenu = ({ tabs, index, onChange }) => {
    const classes = useStyles();
    const history = useHistory();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    const tabList = tabs.map((tab) => (
        <Tab
            label={tab.name ? tab.name : tab.ca_name}
            key={tab.name ? tab.name : tab.ca_name}
            className={styles['tab-item']}
        />
    ));
    return (
        <Tabs
            value={index}
            onChange={onChange}
            TabIndicatorProps={{
                style: {
                    backgroundColor: 'transparent',
                    height: '64px',
                    border: '2px solid black',
                    borderBottom: '2px solid white',
                    boxSizing: 'border-box',
                },
            }}
            className={classes.tabs}
            centered
        >
            {tabList}
        </Tabs>
    );
};

TabMenu.defaultProps = {
    tabs: null,
    index: 0,
    href: false,
    onChange: () => console.warn(null),
};

export default TabMenu;
