import React from 'react';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Collapse } from 'bootstrap';
import { useState} from 'react';
const AccordionItem=({open,toggle,title,desc})=>{ 

    return (
        <div className='pt-[10px]'>
            <div className='bg-[#f1f1f1] p-[10px] cursor-pointer' onClick={toggle}>
                <p className='text pt-[10px] font-semibold' >{title}</p>
                <div className='pt-[10px]'> 
                {open ? <FaMinus/> : <FaPlus/>}
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className='p-[10px] bg-[#020617]' >
                    <p className='bg-[#020617'>{desc}</p>
                </div>
            </Collapse>
        </div>
    );
}

export default AccordionItem;
