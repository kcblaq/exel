import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";

interface ItemListsProps {
    items: string[];
}
export default function ItemLists({ items }: ItemListsProps) {
    return (
        <ul className="list-none flex flex-col gap-2">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                    <Ticks />
                    {item}
                </li>
            ))}
        </ul>
    )
}


export const Ticks = () => {

    return <span className=""> 
    <FaCircleCheck  className='text-primary'/>
    </span>
}
