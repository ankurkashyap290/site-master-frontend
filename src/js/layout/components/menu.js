import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, List } from '@material-ui/core';

import MenuRootItems from './menu-root-items';

const Menu = ({ journeyUser }) => {
  if (!journeyUser || !journeyUser.id) {
    return null;
  }
  return (
    <Drawer
      color="secondary"
      variant="permanent"
      className="menu"
    >
      <List>
        <MenuRootItems />
      </List>
    </Drawer>
  );
};

Menu.defaultProps = {
  journeyUser: null,
};

Menu.propTypes = {
  journeyUser: PropTypes.object,
};

export default Menu;
