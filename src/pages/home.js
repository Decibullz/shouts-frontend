import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import axios from "axios";

import Shout from "../components/Shout";
import Profile from "../components/Profile";

import { connect } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

export class home extends Component {
  state = {
    shouts: null,
  };
  componentDidMount() {
    this.props.getShouts();
  }
  render() {
    const { shouts, loading } = this.props.data;
    let recentShoutsMarkup = !loading ? (
      shouts.map((shouts, idx) => <Shout key={idx} shout={shouts} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentShoutsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getShouts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getShouts })(home);
