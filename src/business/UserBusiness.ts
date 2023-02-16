import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInput, GetUsersOutput, SignupInput, SignupOutput } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { TokenPayload } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager,
    ) {}
    
    public getUsers = async (input: GetUsersInput): Promise<GetUsersOutput> => {
        const { q, token } = input

        if(!token){
            throw new BadRequestError("Token não enviado");
        }

        const payload = this.tokenManager.getPayload(token as string)

        if(payload === null){
            throw new BadRequestError("Token Inválido")
        }

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        const usersDB = await this.userDatabase.findUsers(q)

        const users = usersDB.map((userDB)=>{
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.created_at
            )

            return user.toBusinessModel()
        })

        const output: GetUsersOutput = users

        return output
    }

    public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const hashedPassword = await this.hashManager.hash(password)

        const id = this.idGenerator.generate()

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel()
        await this.userDatabase.insertUser(newUserDB)
        
        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupOutput = {
            message: "Cadastro realizado com sucesso",
            token
        }

        return output
        
    }
}