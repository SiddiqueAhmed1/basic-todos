import React from "react";
const TypeCheck = (type) => {
  switch (type) {
    case "Pending":
      return "yellow";
      break;
    case "Completed":
      return "green";
      break;

    case "Deleted":
      return "red";
      break;
  }
};

export default TypeCheck;
