import { Resolver, Authorized, Mutation, Arg, Query } from "type-graphql";
import UsuarioAcesso from "../model/UsuarioAcesso";
import UsuarioAcessoService from "../service/UsuarioAcessoService";
import { container } from "tsyringe";

@Resolver(UsuarioAcesso)
export default class UsuarioAcessoResolver {

    private service: UsuarioAcessoService

    constructor() {
        this.service = container.resolve(UsuarioAcessoService)
    }

    @Authorized()
    @Mutation(() => Boolean)
    public async criarUsuarioAcesso(
        @Arg('id') pessoaId: number,
        @Arg('login') login: string,
        @Arg('password') password: string) {
        return this.service.criar(pessoaId, login, password)
    }

    @Authorized()
    @Query(() => [UsuarioAcesso])
    public async meusUsuarios() {
        return this.service.getMyUsers()
    }
}