"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

function Calendar() {
  const locale = useLocale();

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>([null, null]);

  const handleDateChange = (newValue: DateRange<Dayjs>) => setSelectedDateRange(newValue);

  const dayJsLocale = locale || "en";

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayJsLocale}>
        <DemoContainer components={["DateRangeCalendar"]}>
          <DateRangeCalendar
            value={selectedDateRange}
            onChange={handleDateChange}
            minDate={dayjs()}
            sx={{
              "& .MuiDayCalendar-weekContainer": {
                outline: "none !important",
                border: "none !important",
                "&:hover": {
                  outline: "none !important",
                  border: "none !important",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#5D3277 !important",
                borderRadius: "4px !important",
              },
              "& .MuiDateRangeCalendar-day": {
                borderRadius: "8px",
              },
              "& .MuiDateRangeCalendar-rangeInterval": {
                backgroundColor: "#e4dae6",
                borderRadius: "8px",
              },
              "& .MuiDateRangePickerDay-root": {
                borderRadius: "0px !important",
              },
              "& .MuiButtonBase-root": {
                borderRadius: "4px !important",
                "&:hover": {
                  borderRadius: "4px !important",
                },
              },
              "& .MuiDateRangePickerDay-rangeIntervalDayHighlightStart": {
                borderRadius: "4px !important",
                backgroundColor: "#5D3277 !important",
              },
              "& .MuiDateRangePickerDay-rangeIntervalDayHighlightEnd": {
                borderRadius: "4px !important",
                backgroundColor: "#5D3277 !important",
              },
              "& .MuiDateRangePickerDay-rangeIntervalDayHighlight": {
                backgroundColor: "#e4dae6",
              },
              "& .MuiDateRangePickerDay-hiddenDayFiller": {
                backgroundColor: "transparent !important",
              },
              "& .MuiPickersDay-today": {
                border: "0px !important",
              },
              "& .MuiDateRangePickerDay-rangeIntervalDayHighlight:first-of-type": {
                borderTopLeftRadius: "4px !important",
                borderBottomLeftRadius: "4px !important",
              },
              "& .MuiDateRangePickerDay-rangeIntervalDayHighlight:last-of-type": {
                borderTopRightRadius: "4px !important",
                borderBottomRightRadius: "4px !important",
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}

export default Calendar;
