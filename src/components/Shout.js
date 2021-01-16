import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeShout, unlikeShout } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

export class Shout extends Component {
  likedShout = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.shoutId === this.props.shout.shoutId
      )
    )
      return true;
    else return false;
  };
  likeShout = () => {
    this.props.likeShout(this.props.shout.shoutId);
  };
  unlikeShout = () => {
    this.props.unlikeShout(this.props.shout.shoutId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      shout: {
        body,
        createdAt,
        userImage,
        userHandle,
        shoutId,
        likeCount,
        commentCount,
      },
      user: { authenticated },
    } = this.props;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedShout() ? (
      <MyButton tip="Undo like" onClick={this.unlikeShout}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeShout}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variants="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="Comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Shout.propTypes = {
  likeShout: PropTypes.func.isRequired,
  unlikeShout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  shout: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeShout,
  unlikeShout,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Shout));
