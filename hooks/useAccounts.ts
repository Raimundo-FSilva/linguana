import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export interface IAluno {
    id: string
    nome: string,
    turma: string,
    nascimento: string,
    matricula: string,
    avatar: number
}

const useAccounts = () => {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState<IAluno | null>(null)

    const router = useRouter()

    const getProfile = async () => {
        if(account) return;
        const alunoID = localStorage.getItem("id");

        if(!alunoID) return setTimeout(() => setLoading(false), 1500);

        try {
            const aluno = await axios.get("/api/profile?id="+alunoID)
            setAccount(aluno.data.aluno)
        }
        catch(err: any) {
            if(err?.response?.data) {
                console.error(err.response.data.error)
            }

        }
        finally {

            setTimeout(() => setLoading(false), 1500)
            
        }
    }

    const handleAuth = async ({nome, avatar, matricula, nascimento, turma}: {avatar: number, nome: string, matricula: string, nascimento: string, turma: string}) => {
        try {
            setLoading(true)
      
            const validation = await axios.post(
              `/api/auth`,
              {nome, matricula, turma, nascimento, avatar}
            )

            setAccount(validation.data.aluno)
            localStorage.setItem("id", validation.data.aluno.id)
            router.back()
            toast.success("Sucesso.")
    
          }
          catch (err: any){
            let error = "Ocorreu um erro durante sua validação!";
      
            const response = err.response.data.error;
            if(response) error = response;
            toast.error(error)
          }
          finally {
            setLoading(false)
          }
      
    }

    useEffect(() => {
        getProfile().then()
    }, [])
    

    return {
        account, loading, handleAuth
    }

}

export {useAccounts}