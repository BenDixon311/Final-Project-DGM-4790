import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import HomeGraphql from './Home-Graphql';
import AddRest from './Add-Rest';
import HomeRest from './Home-Rest';
import AddGraphql from './Add-Graphql';


function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
  }
  
  const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  });



class Header extends Component {

    state = {
        value: 0,
      };
    
      handleChange = (event, value) => {
        this.setState({ value });
      };
    
    render() {
        
        const { value } = this.state;
        return (
         <NoSsr>
                <div>
                <AppBar position="static">
                    <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
                    <LinkTab label="REST Home" href="page1" />
                    <LinkTab label="REST Add" href="page2" />
                    <LinkTab label="Graphql Home" href="/HomeGraphql" />
                    <LinkTab label="Graphql Add" href="page3" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><HomeRest /></TabContainer>}
                {value === 1 && <TabContainer><AddRest /></TabContainer>}
                {value === 2 && <TabContainer><HomeGraphql /></TabContainer>}
                {value === 3 && <TabContainer><AddGraphql /></TabContainer>}
                </div>
        </NoSsr>
        )
    }
}

export default Header;