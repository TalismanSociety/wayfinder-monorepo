import { WalletSelect } from '@talismn/connect-components'
import { WalletAccount } from '@talismn/connect-wallets'
import { ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

type Account = WalletAccount & { avatar?: string }

const Context = createContext<{
  accounts: Account[]
  setAccounts: React.Dispatch<SetStateAction<Account[]>>
}>({
  accounts: [],
  setAccounts: () => {},
})

// hook for components to access accounts
export const useAccounts = () => useContext(Context).accounts

// provider for the accounts hook
export const AccountsProvider = ({ children }: { children?: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  return (
    <Context.Provider value={useMemo(() => ({ accounts, setAccounts }), [accounts, setAccounts])}>
      {children}
    </Context.Provider>
  )
}

// connect button component
export function Connect({ dappName = 'XCM Motherfucka!' }: { dappName?: string }) {
  const { setAccounts } = useContext(Context)

  return (
    <WalletSelect
      dappName={dappName}
      onUpdatedAccounts={(accounts) => setAccounts(accounts ?? [])}
      triggerComponent={<button>Connect</button>}
    />
  )
}
