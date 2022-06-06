import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

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

export default function MultipleSelectChip(props) {
  const [materialTags, setMaterialTags] = useState([]);

  useEffect((props) => {
    // create a array of material tags id
    const materialTagsId = materialTags.map(name => props.options[name]);
    console.log(materialTagsId);
    props.setNewObj({
      ...props.newObj,
      [props.id]: materialTagsId,
    });
  }, [materialTags]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setMaterialTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl
      margin="dense"
      fullWidth 
      // sx={{ m: 1, width: 300 }}
    >
      <InputLabel id="demo-multiple-chip-label"> { props.label } </InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={materialTags}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value, index) => (
              <Chip key={index} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {Object.keys(props.options).map((name, index) => (
          <MenuItem
          key={ index }
          value= { name }
        >
          { name }
        </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
