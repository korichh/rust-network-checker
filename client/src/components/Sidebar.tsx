import { NavLink } from "react-router";

export default function Sidebar() {
  return (
    <aside className="max-w-[280px] w-full bg-secondary-light pb-8">
      <NavLink to="/" className={() => `block text-center text-primary font-bold px-4 py-8`}>
        <span className="text-2xl">Network Checker</span>
        <span className="text-xs pl-1">v.01</span>
      </NavLink>
      <nav>
        <ul className="border-t border-[rgba(0,0,0,0.1)]">
          <li className="border-b border-[rgba(0,0,0,0.1)]">
            <NavLink to="/" className={({ isActive }) => `block px-4 py-3 hover:bg-[rgba(255,255,255,0.5)] hover:pl-6 transition-all
              ${isActive ? "pointer-events-none bg-[rgba(255,255,255,0.8)] pl-6" : "bg-[rgba(255,255,255,0.3)]"}`}>
              Home
            </NavLink>
          </li>
          <li className="border-b border-[rgba(0,0,0,0.1)]">
            <NavLink to="/options" className={({ isActive }) => `block px-4 py-3 hover:bg-[rgba(255,255,255,0.5)] hover:pl-6 transition-all
              ${isActive ? "pointer-events-none bg-[rgba(255,255,255,0.8)] pl-6" : "bg-[rgba(255,255,255,0.3)]"}`}>
              Options
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}