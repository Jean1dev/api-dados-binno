import { AuthChecker } from "type-graphql";
import { container } from "tsyringe";
import AuthenticationHolder from "../context/AuthenticationHolder";
import DefaultAppError from "../errors/DefaultAppError";
import { verify } from "jsonwebtoken";
import config from '../config/env'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export const customAuthChecker: AuthChecker = (
  props: any,
  roles,
) => {
  const { root, args, context, info } = props
  const auth = context.request.req.headers.authorization

  if (!auth) {
    throw new DefaultAppError('Nao autorizado', 403)
  }

  const isMobileClient = context.request.req.headers.mobile
  const userAccess = context.request.req.headers.user_access

  if (isMobileClient) {
    container.resolve(AuthenticationHolder).setAuthenticationData({ matriz_id: Number(userAccess) })
    return true
  }

  const [, token] = auth?.split(' ')
  try {
    const decoded = verify(token, config.JWT_SECRET)
    const { sub } = decoded as TokenPayload

    container.resolve(AuthenticationHolder).setAuthenticationData({ matriz_id: Number(sub) })
    return true
  } catch (error) {
    throw new DefaultAppError('JWT invalido', 403)
  }
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

  return true; // or false if access is denied
};