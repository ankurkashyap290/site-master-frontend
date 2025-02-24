import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ListItem, Typography } from '@material-ui/core';

import MenuFacilityItems from '../containers/menu-facility-items';
import MenuItem from './menu-item';

class MenuRootItems extends React.Component {
  constructor(props) {
    super(props);
    this.getFacilityContainerClassName = this.getFacilityContainerClassName.bind(this);
  }

  getFacilityContainerClassName(facility) {
    return facility.id === this.props.selectedFacility.id ? 'facility-menu-container selected' : 'facility-menu-container';
  }

  render() {
    const user = this.props.journeyUser;
    return (
      <div>
        <MenuItem to="/tutorial" icon="video_library" label="Tutorial" />
        {user.isAllowed('view', 'Organizations') ?
          <MenuItem to="/organizations" icon="location_city" label="Organizations" />
        : null}
        {user.isAllowed('view', 'Facilities') ?
          <MenuItem to="/facilities" icon="location_city" label="Facilities" />
        : null}
        {user.isAllowed('view', 'Upper Management') ?
          <MenuItem to="/upper-management" icon="people" label="Upper Management" />
        : null}
        {user.isAllowed('view', 'Reporting') ?
          <MenuItem to="/reporting" icon="trending_up" label="Reporting" />
        : null}
        {this.props.journeyUser.attributes.facilities.map(facility => (
          <div key={facility.id} className={this.getFacilityContainerClassName(facility)}>
            <ListItem>
              <Typography>{facility.name}</Typography>
            </ListItem>
            <ListItem>
              <MenuFacilityItems
                {...this.props}
                facility={facility}
              />
            </ListItem>
          </div>
        ))}
      </div>
    );
  }
}

MenuRootItems.defaultProps = {
  selectedFacility: {},
};

MenuRootItems.propTypes = {
  journeyUser: PropTypes.object.isRequired,
  selectedFacility: PropTypes.object,
};

const mapStateToProps = ({ authReducer, facilityReducer }) => ({
  journeyUser: authReducer.journeyUser,
  selectedFacility: facilityReducer.selectedFacility,
});

export default connect(
  mapStateToProps,
  null,
)(MenuRootItems);
