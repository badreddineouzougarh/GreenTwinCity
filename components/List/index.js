import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ListCard = ({ index, item, scrollToParagraph }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <button
            className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
                } hover:scale-105 link`}
            onClick={() => scrollToParagraph(index)}
        >
            <div className="mt-5 text-xl">
                {item ? (
                    <ul id="text_list">
                        <li>{item.item}</li>
                    </ul>
                ) : (
                    "Description not found."
                )}
            </div>
        </button>
    );
};

export default ListCard;
