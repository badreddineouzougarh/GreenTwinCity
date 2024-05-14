import { Collapse } from 'react-collapse';
// Importation dynamique du script Bootstrap pour le SSR (Server Side Rendering)
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

const AccordionItem = ({ open, toggle, title, desc }) => {

    // Import dynamique de Bootstrap
    
    return (
        <div className='pt-[10px] grid grid-cols-1 divide-y'>
            <div className='py-[25px] px-[50px] flex justify-between items-center cursor-pointer bg-white'
                onClick={toggle}>
                <p className='text-[20px] font-semibold ms-30'>{title}</p>
                <div className='text-[20px] ms-20'>
                    {open ? <SlArrowDown /> : <SlArrowUp />}
                </div>
            </div>
            <Collapse isOpened={open} >
                <div className='p-[50px] bg-white pb-[20px] px-20'>
                    {desc}
                </div>
            </Collapse>
            
        </div>
    );
}

export default AccordionItem;
