import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';

/**
 * @class MenuItem
 * @description Since React Router is buggy, this is a manual workaround for activeClassName.
 */
class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: props.history,
    };
    this.getNavLinkClassName = this.getNavLinkClassName.bind(this);
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(history => this.setState({ history }));
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getNavLinkClassName() {
    return this.state.history.pathname === this.props.to ? 'active' : '';
  }

  render() {
    return (
      <NavLink to={this.props.to} activeClassName="" className={this.getNavLinkClassName()}>
        <ListItem button>
          <ListItemIcon>
            <Icon className="menu-icon">{this.props.icon}</Icon>
          </ListItemIcon>
          <ListItemText primary={this.props.label} className="menu-item" />
        </ListItem>
      </NavLink>
    );
  }
}

MenuItem.propTypes = {
  history: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default withRouter(MenuItem);
