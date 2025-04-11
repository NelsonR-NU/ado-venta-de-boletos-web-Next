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
  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  // Sync with external state if provided
  useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  // Determine if component is controlled or uncontrolled
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // In uncontrolled mode, update internal state
    if (!isControlled) {
      setInternalChecked(event.target.checked);
    }

    // Always call external onChange if provided
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          sx={{
            color: "#6B7280",
            "&.Mui-checked": { color: "#6B21A8" },
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
