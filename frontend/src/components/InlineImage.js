import { React } from "react";
function InlineImage(props) {
  return (
    <i
      className={props.className}
      id={props.id}
      name={props.name}
      onClick={props.clickEvent}
    >
      {props.image}
    </i>
  );
}

export default InlineImage;
