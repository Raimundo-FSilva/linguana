import React, { createContext, ReactNode } from "react";
import {IAluno, useAccounts} from "../hooks/useAccounts"

interface IAccountContext {

    account: IAluno | null
    loading: boolean
    handleAuth: (data: {avatar: number, nome: string, matricula: string, nascimento: string, turma: string}) => Promise<void>
}

// @ts-ignore
export const accountsContext = createContext<IAccountContext>(null)

export function AccountsContextProvider({children} : { children: ReactNode}) {
    const {account, loading, handleAuth} = useAccounts()

    const values: IAccountContext = {
        account,
        loading,
        handleAuth
    }

    return (
        <accountsContext.Provider value={values}>
            {children}
        </accountsContext.Provider>
    );
} 