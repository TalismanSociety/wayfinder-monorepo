import { WayfinderProvider } from '@talismn/wayfinder-react'
import { ReactNode } from 'react'

import { AccountsProvider } from './Accounts'

export function AppProvider({ children }: { children?: ReactNode }) {
  return (
    <WayfinderProvider>
      <AccountsProvider>{children}</AccountsProvider>
    </WayfinderProvider>
  )
}
