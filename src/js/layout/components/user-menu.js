import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as LinkTo } from 'react-router-dom';
import { Avatar, Icon, Button, MenuList, MenuItem, Popover, Divider } from '@material-ui/core';

import { logout } from '../../auth/store/actions';
import { rolesGetNameById } from '../../config/roles';
import BiddingMenu from './bidding-menu';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.createInitials = this.createInitials.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  createInitials() {
    const { attributes } = this.props.journeyUser;
    return attributes.first_name[0] + attributes.last_name[0];
  }

  logout() {
    this.handleClose();
    this.props.logOut();
  }

  render() {
    const { journeyUser } = this.props;
    if (!journeyUser || !journeyUser.id) {
      return null;
    }
    const { anchorEl } = this.state;
    const { handleClick, handleClose, createInitials } = this;

    return (
      <div className="user-menu">
        {this.props.journeyUser.isAllowed('view', 'Bidding') ?
          <BiddingMenu />
        : null}
        <Button onClick={handleClick} >
          <Avatar color="primary" className="avatar">{createInitials()}</Avatar>
          {journeyUser.attributes.first_name}
          {journeyUser.attributes.middle_name ? ` ${journeyUser.attributes.middle_name} ` : ' '}
          {journeyUser.attributes.last_name}
          <Icon>arrow_drop_down</Icon>
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          className="user-menu-popover"
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          onClose={handleClose}
        >
          <MenuList role="menu">
            <MenuItem disabled>
              {rolesGetNameById(this.props.journeyUser.attributes.role_id)}
              {this.props.journeyUser.attributes.organization.id ?
                ` @ ${this.props.journeyUser.attributes.organization.name}` :
                ' @ Journey'}
            </MenuItem>
            <Divider className="divider" />
            <LinkTo to="/my-profile" className="styleless">
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
            </LinkTo>
            <LinkTo to="/change-password" className="styleless">
              <MenuItem onClick={handleClose}>Change My Password</MenuItem>
            </LinkTo>
            <MenuItem onClick={this.logout}>Logout</MenuItem>
          </MenuList>
        </Popover>
      </div>);
  }
}

UserMenu.defaultProps = {
  journeyUser: null,
};

UserMenu.propTypes = {
  journeyUser: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logOut: () =>
    dispatch(logout())
  ,
});

export default connect(null, mapDispatchToProps)(UserMenu);
