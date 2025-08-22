import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'
import { Link } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'
import { AccountMenu } from './accountMenu'
import { CustomNavLink } from './customNavLink'

export function Header() {
  return (
    <div className="flex h-20 items-center justify-between border-b border-shape">
      <div className=" p-5">
        <img src={logoImage} className="h-10 w-14" alt="Logo" />
      </div>

      <nav className="flex gap-2">
        <CustomNavLink to="/">
          <ChartHistogramIcon className="h-5 w-5" />
          Dashboard
        </CustomNavLink>

        <CustomNavLink to="/products">
          <PackageIcon className="h-5 w-5" />
          Produtos
        </CustomNavLink>
      </nav>

      <div className="flex items-center gap-4 pr-5">
        <Link to="/products/add">
          <button className="flex h-10 w-full items-center justify-between gap-2 rounded-[.625rem] bg-orange-base px-4 text-white transition-colors duration-200 hover:bg-orange-dark">
            <PlusSignIcon className="h-5 w-5" />
            <span className="action-sm">Novo produto</span>
          </button>
        </Link>

        <AccountMenu />
      </div>
    </div>
  )
}
