"use client"

import { Box, Stack } from '@mui/material'
import React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import dayjs from 'dayjs'

function MyPosts() {

  return (
    <>
        <Box
            sx={{
                height: '100vh', 
                display: 'flex',
                flexDirection: 'column', 
                backgroundColor: '#f9f9f9'
            }}
        >
            <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="space-between"
                sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                }} 
            >
                <Box 
                    id="postListContainer"
                    padding={2}
                    flex={4} 
                    sx={{
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                        display: 'none', 
                        },
                        scrollbarWidth: 'none',
                    }}
                >
                    {/* <CustomCalendar /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateRangeCalendar']}>
                            <DateRangeCalendar 
                                onChange={(newValue) => console.log(newValue)}
                                minDate={dayjs()}
                                sx={{
                                    "& .MuiDayCalendar-weekContainer": {
                                        outline: "none !important",
                                        border: "none !important",
                                        "&:hover": {
                                            outline: "none !important",
                                            border: "none !important",
                                        }
                                    },
                                    "& .Mui-selected": {
                                      backgroundColor: "#5D3277 !important", // Dark purple for selection
                                      borderRadius: "4px !important"
                                    },
                                    "& .MuiDateRangeCalendar-day": {
                                      borderRadius: "8px",
                                    },
                                    "& .MuiDateRangeCalendar-rangeInterval": {
                                      backgroundColor: "#e4dae6", // Light purple background
                                      borderRadius: "8px",
                                    },
                                    "& .MuiDateRangePickerDay-root": {
                                        borderRadius: "0px !important",
                                        // "&:hover": {
                                        //     borderRadius: "4px !important",
                                        // }
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
                </Box>
            </Stack>
        </Box>
    </>
  )
}

export default MyPosts