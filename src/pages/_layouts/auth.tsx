import { Outlet } from 'react-router-dom'

import backgroundImage from '../../assets/images/background.svg'
import logoWithTextImage from '../../assets/images/logoWithText.svg'

export function AuthLayout() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-7 flex h-full flex-col gap-[51px]">
        <div className="pl-10 pt-10">
          <img src={logoWithTextImage} alt="Logo" />
        </div>

        <div className="flex items-center justify-center">
          <img src={backgroundImage} alt="Background image" />
        </div>
      </div>

      <div className="col-span-5 flex h-[768px] items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  )
}
