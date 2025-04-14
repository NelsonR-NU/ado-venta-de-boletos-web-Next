import React, { useEffect, useState } from "react";
import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

interface CheckboxProps {
  label: string | React.ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  defaultChecked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = "",
  name,
  defaultChecked = false,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          disableRipple
          sx={{
            color: "#6B7280",
            cursor: "pointer",
            "&.Mui-checked": { color: "#6B21A8" },
            "&:hover": {
              color: "#6B7280CC",
              "&.Mui-checked": { color: "#6B21A8CC" },
            },
            "& .MuiTouchRipple-root": {
              display: "none",
            },
            "&.MuiCheckbox-root:hover": {
              backgroundColor: "transparent",
              cursor: "pointer",
            },
            "&.Mui-focusVisible": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          checked={isChecked}
          onChange={handleChange}
          name={name}
        />
      }
      label={label}
      className={className}
    />
  );
};

export default Checkbox;
