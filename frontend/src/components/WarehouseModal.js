import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    position: "relative",
    textAlign: "center",
  },
  title: {
    position: "absolute",
    top: "36px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "500",
    fontSize: "35px",
    color: "#CAA472",
  },
  exit: {
    position: "absolute",
    top: "26px",
    right: "0",
    transform: "translate(-50%, -50%)",
    color: "#CAA472",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
  },
  image_shadow: {
    width: "1000px",
    height: "550px",
    boxShadow: "0 0 25px 5px rgba(0,0,0,0.5)",
  },
}));

function WarehouseModal({ showModal, setShowModal }) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={showModal}
      onClose={() => setShowModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showModal}>
        <div className={classes.container}>
          <div className={classes.title}>Warehouse Map</div>
          <button className={classes.exit} onClick={() => setShowModal(false)}>
            <CloseIcon />
          </button>
          <img
            className={classes.image_shadow}
            alt="Warehouse Map"
            src={"./assets/warehouse_map.png"}
          />
        </div>
      </Fade>
    </Modal>
  );
}

export default WarehouseModal;
