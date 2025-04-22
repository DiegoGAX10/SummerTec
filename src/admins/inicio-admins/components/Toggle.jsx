import { FiGrid } from "react-icons/fi";
import { FaCalendarDay } from "react-icons/fa";

export default function Toggle() {
  return (
    <div className="my-5   px-4">
      <label
        htmlFor="Toggle4"
        className="inline-flex items-center rounded-lg overflow-hidden border border-[var(--primary-color)] cursor-pointer"
      >
        <input id="Toggle4" type="checkbox" className="hidden peer" />
        
        {/* Cuadrícula */}
        <span className="flex items-center gap-2 px-4 py-2 text-[var(--primary-color)] bg-white peer-checked:bg-[var(--primary-color)] peer-checked:text-white transition-colors duration-300">
          <FiGrid /> Cuadrícula
        </span>

        {/* Calendario */}
        <span className="flex items-center gap-2 px-4 py-2 text-white bg-[var(--primary-color)] peer-checked:bg-white peer-checked:text-[var(--primary-color)] transition-colors duration-300">
          <FaCalendarDay /> Calendario
        </span>
      </label>
    </div>
  );
}
