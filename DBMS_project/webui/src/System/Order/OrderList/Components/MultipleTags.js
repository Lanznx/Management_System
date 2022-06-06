import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleTags(props) {
  const { chosedTags, setChosedTags, allTags } = props;

  const handleChange = (e) => {
    console.log(e.target.value, "e.target.value");
    let chosedTagsValues = e.target.value;
    let chosedTagsKeys = [];
    Object.keys(allTags).find((key) => {
      chosedTagsValues.map((value) => {
        console.log(JSON.stringify(allTags[key]));
        console.log(JSON.stringify(value));
        if (JSON.stringify(allTags[key]) == JSON.stringify(value))
          chosedTagsKeys.push(key);
      });
    });
    let newChosedTags = {};
    chosedTagsKeys.map((key) => {
      newChosedTags[key] = allTags[key];
    });
    setChosedTags(newChosedTags);
  };

  console.log(chosedTags, "chosedTags");

  return (
    <FormControl
      margin="dense"
      fullWidth
      // sx={{ m: 1, width: 300 }}
    >
      <InputLabel id="demo-multiple-chip-label"> {props.label} </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={Object.values(chosedTags).map((tag) => tag)}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value, index) => (
              <Chip key={index} label={value} color="primary" />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {Object.values(props.options).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
