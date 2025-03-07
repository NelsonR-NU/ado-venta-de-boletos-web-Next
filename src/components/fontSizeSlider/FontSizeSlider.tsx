"use client";
import { useState } from "react";
import { Slider, ClickAwayListener } from "@mui/material";
import FontSizeIcon from "@/assets/svg/font.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const FontSizeSlider = () => {
    const [open, setOpen] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const t = useTranslations("accessibility_bar");

    const marks = [
        { value: 19 },
        { value: 26 },
    ];

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (_: Event, newValue: number | number[]) => {
        setFontSize(newValue as number);
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div className="relative inline-block">
                <div
                    className="flex flex-row-reverse gap-[13px] cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="text-ado-white hidden md:inline">
                        {t("size")}
                    </span>
                    <Image
                        alt="font Icon"
                        src={FontSizeIcon}
                        height={16}
                        width={16}
                    />
                </div>

                {open && (
                    <div className="absolute top-10 left-0 w-72 p-4 bg-white rounded-lg shadow-lg z-10 block">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-black">A</span>
                            <Slider
                                value={fontSize}
                                onChange={handleChange}
                                step={1}
                                min={12}
                                max={32}
                                marks={marks}
                                sx={{
                                    color: "#581c87",
                                    "& .MuiSlider-thumb": {
                                        backgroundColor: "#581c87",
                                    },
                                    "& .MuiSlider-mark": {
                                        backgroundColor: "#581c87",
                                        height: "8px",
                                        width: "8px",
                                        borderRadius: "50%",
                                        transform: "translate(-50%, -50%)",
                                    },
                                    "& .MuiSlider-markActive": {
                                        opacity: 1,
                                        backgroundColor: "#581c87",
                                    },
                                }}
                            />
                            <span className="text-lg font-medium text-black">A</span>
                        </div>
                        <p className="text-center text-sm mt-2">
                            Ajusta el tamaño de texto en pantalla
                        </p>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default FontSizeSlider;
