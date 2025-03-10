import { MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import "./../../../index.css"
const SidebarContext = createContext();

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const [activeItem, setActiveItem] = useState(null);

    // This will handle hover state
    const handleMouseEnter = () => setExpanded(true);
    const handleMouseLeave = () => setExpanded(false);

    // Function to handle item click
    const handleItemClick = (text) => {
        setActiveItem(text);
    };

    return (
        <aside
            className="h-screen"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <nav className="h-full flex flex-col border-r shadow-sm">
                <div className="p-4 pb-20 flex justify-between items-center">
                    <img
                        src="/summer_tec.svg"
                        className={`overflow-hidden transition-all ${expanded ? "w-xs " : "w-0"}`}
                        alt="Summer Tec Logo"
                    />
                </div>

                <SidebarContext.Provider value={{ expanded, activeItem, handleItemClick }}>
                    <ul className="flex-1 px-3 text-2xl ">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex flex-row p-3 items-center">

                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-25 rounded-md"
                    />
                    <div
                        className={`flex flex-col justify-center items-center overflow-hidden transition-all ${
                            expanded ? "w-55 ml-3" : "w-0"
                        }`}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold text-black text-xl">John Doe</h4>
                            <span className="text-xl text-gray-600">johndoe@gmail.com</span>
                        </div>
                    </div>
                    {expanded && <MoreVertical className="text-black" />}


                </div>
            </nav>
        </aside>
    );
}

export function SideBarItem({ icon, text, alert }) {
    const { expanded, activeItem, handleItemClick } = useContext(SidebarContext);
    const isActive = activeItem === text;

    return (
        <li
            className={` flex items-center justify-center py-5 px-3 my-8 font-medium rounded-md cursor-pointer transition-colors group ${
                isActive
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 "
                    : "hover:bg-indigo-50 text-gray-600 "
            }`}
            onClick={() => handleItemClick(text)}
        >
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-50 ml-3 " : "w-0"}`}>
                {text}
            </span>
            {alert && (
                <div className={"absolute right-2 w-2 h-2 rounded bg accent-amber-400"}></div>
            )}
        </li>
    );
}