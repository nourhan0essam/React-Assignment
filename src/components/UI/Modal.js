import { Fragment } from "react";
import ReactDom from "react-dom";

import styles from "./Modal.module.css";
import Card from "./Card";

const Overlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Card>
          <div className={styles.container}>
            <h2>Are you sure you want to add this fork to your favorites?</h2>
            <button type="button" onClick={props.onAdd}>
              Yes
            </button>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const BackDrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCancel}></div>;
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <BackDrop onCancel={props.onCancel} />,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <Overlay onAdd={props.onAdd} onCancel={props.onCancel} />,
        document.getElementById("overlay")
      )}
    </Fragment>
  );
};
export default Modal;
