import React from "react";

import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";

const Modal = ({ modalType }) => {
  if (modalType === "add") {
    return <AddModal />;
  } else {
    return <DeleteModal />;
  }
};

export default Modal;
