import { HttpClient } from "../../infra/HttpClient/HttpClient"
import { tokenService } from "./tokenService"

export const authService = {
   async login(Email, Password){
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            credentials: 'include',
            body: { Email, Password }
        })
        .then(async (respostaDoServidor) => {
            if(!respostaDoServidor.ok) throw new Error('Usuário ou senha inválidos!')
            const body = await respostaDoServidor.body

            tokenService.save(body.token)
        })
    }
}