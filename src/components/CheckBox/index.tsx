import React from "react";
import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface CheckboxProps {
  label: string | React.ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; 
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  className = "",
  name,
}) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          sx={{
            color: "#6B7280",
            "&.Mui-checked": { color: "#6B21A8" },
          }}
          checked={checked}   
          onChange={onChange}  
          name={name} 
        />
      }
      label={label}
      className={className}
    />
  );
};

export default Checkbox;
