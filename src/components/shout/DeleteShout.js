import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// REDUX
import { connect } from "react-redux";
import { deleteShout } from "../../redux/actions/dataActions";

// Material UI
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// icon
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

class DeleteShout extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteShout = () => {
    this.props.deleteShout(this.props.shoutId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        <MyButton
          tip="Delete"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this Shout!? This action is not
            reversible
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteShout} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
DeleteShout.propTypes = {
  deleteShout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  shoutId: PropTypes.string.isRequired,
};

export default connect(null, { deleteShout })(withStyles(styles)(DeleteShout));
