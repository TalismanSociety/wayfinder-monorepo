import { ReactNode } from 'react'

import { AccountsProvider } from './Accounts'
import { WayfinderProvider } from './useWayfinder'

export function AppProvider({ children }: { children?: ReactNode }) {
  return (
    <WayfinderProvider>
      <AccountsProvider>{children}</AccountsProvider>
    </WayfinderProvider>
  )
}
