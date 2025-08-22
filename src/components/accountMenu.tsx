import { useMutation, useQuery } from '@tanstack/react-query'
import { Logout01Icon } from 'hugeicons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '../api/get-profile'
import { signOut } from '../api/sign-out'
import defaultAvatar from '../assets/images/default-avatar.svg'
import { queryClient } from '../lib/react-query'
import { Skeleton } from './skeleton'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear()

      navigate('/sign-in', { replace: true })
    },
  })

  const [isOpen, setIsOpen] = useState(false)

  const toggleAccountMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className="relative">
      <div onClick={toggleAccountMenu} className="cursor-pointer">
        {isLoadingProfile ? (
          <Skeleton className="h-12 w-12 rounded-[10px]" />
        ) : (
          <img
            src={profile?.avatar?.url || defaultAvatar}
            className="h-12 w-12 cursor-pointer rounded-[10px] object-cover"
            alt="Imagem do usuário"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-3 flex w-[168px] flex-col gap-5 rounded-[12px] bg-white p-4 shadow-lg">
          <div className="flex items-center gap-3">
            {isLoadingProfile ? (
              <>
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-xl" />
              </>
            ) : (
              <>
                <img
                  src={profile?.avatar?.url || defaultAvatar}
                  alt="Imagem do usuário"
                  className="h-8 w-8 rounded-lg border border-shape object-cover"
                />

                <p className="body-sm text-gray-300">{profile?.name}</p>
              </>
            )}
          </div>

          <div className="border-t border-shape"></div>

          <button
            className="flex items-center justify-between  p-0.5 text-orange-base transition-colors duration-200 hover:text-orange-dark"
            onClick={() => signOutFn()}
            disabled={isSigningOut}
          >
            <p className="action-sm">Sair</p>

            <Logout01Icon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
