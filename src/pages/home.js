import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import Shout from "../components/Shout";
import Profile from "../components/Profile";

export class home extends Component {
  state = {
    shouts: null,
  };
  componentDidMount() {
    axios
      .get("/shouts")
      .then((res) => {
        this.setState({
          shouts: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recentShoutsMarkup = this.state.shouts ? (
      this.state.shouts.map((shouts, idx) => <Shout key={idx} shout={shouts} />)
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

export default home;
