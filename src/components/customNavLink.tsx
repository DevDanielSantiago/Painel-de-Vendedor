import { NavLink, NavLinkProps } from 'react-router-dom'

export function CustomNavLink(props: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) => `        
        flex h-10 items-center gap-2 rounded-[10px] px-4
        ${
          isActive
            ? 'action-sm bg-shape text-orange-base pointer-events-none'
            : 'body-sm hover:text-orange-dark text-gray-300'
        }
      `}
      {...props}
    />
  )
}
