import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const tabType = [
  {
    id:1,
    type: "추천메뉴",
  },
  {
    id:2,
    type:"분류1",
  },
  {
    id:3,
    type:"분류2",
  },
  {
    id:4,
    type:"분류3",
  },
];



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function SimpleTabs({ children }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor="primary">
          {tabType.map(tab => (
            <Tab label={tab.type} {...a11yProps(tab.id)} key= {tab.id}/>
          ))}
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {children[0]}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {children[1]}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {children[2]}
      </TabPanel>
    </div>
  );
}