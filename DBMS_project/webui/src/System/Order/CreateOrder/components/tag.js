import { useState } from "react";
import { Chip } from "@mui/material";

export default function Tag(props) {
  const [clicked, setClicked] = useState(false);

  return (
    <Chip
      color={clicked ? "primary" : "default"}
      key={props.tag}
      label={props.tag}
      onClick={() => {
        setClicked(!clicked);
        if (!clicked) {
          props.setChosedTags([
            ...props.chosedTags,
            Object.keys(props.tags).find(
              (key) => props.tags[key] === props.tag
            ),
          ]);
        } else {
          props.setChosedTags(
            props.chosedTags.filter(
              (tag) =>
                tag !==
                Object.keys(props.tags).find(
                  (key) => props.tags[key] === props.tag
                )
            )
          );
        }
      }}
    />
  );
}
