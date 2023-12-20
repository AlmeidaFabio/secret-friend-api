import { createToken } from "./CreateToken"

export const validateToken = (token:string) => {
    const currentToken = createToken()

    return token === currentToken
}