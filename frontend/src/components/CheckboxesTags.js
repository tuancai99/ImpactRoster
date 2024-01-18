import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ projectTitle, onProjectChange }) {
  const handleProjectChange = (_, selectedProjects) => {
    onProjectChange(selectedProjects);
  };

  return (
    <Autocomplete
      multiple
      size="small"
      id="checkboxes-tags-demo"
      options={projectTitle}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option}
        </li>
      )}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="" placeholder="Filter by Hero Project" />
      )}
      onChange={handleProjectChange}
    />
  );
}
