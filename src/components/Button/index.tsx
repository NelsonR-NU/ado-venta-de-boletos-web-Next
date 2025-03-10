import React from 'react'

function AdoButton({width, backgroundColor, borderColor, buttonText, textColor}: {width: number, backgroundColor: string, borderColor: string, buttonText: string, textColor: string}) {
  return (
    <div 
        className='h-[43px] flex justify-center items-center rounded-[4px] text-[16px] font-medium '
        style={{
            width: `${width}%`,
            backgroundColor: backgroundColor || 'white',
            border: borderColor ? `2px solid ${borderColor}` : 'none',
            color: textColor || 'white'
        }}
    >{buttonText}</div>
  )
}

export default AdoButton