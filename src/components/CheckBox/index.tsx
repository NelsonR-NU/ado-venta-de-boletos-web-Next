import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface AdoCheckboxProps {
  label: string | React.ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const AdoCheckbox: React.FC<AdoCheckboxProps> = ({
  label,
  checked = false,
  onChange,
  className = "",
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "#6B7280",
            "&.Mui-checked": { color: "#6B21A8" },
          }}
          checked={checked}   
          onChange={onChange}  
        />
      }
      label={label}
      className={className}
    />
  );
};

export default AdoCheckbox;
