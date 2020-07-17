import { AuthChecker } from "type-graphql";
import ensureAuthenticated from "./implementations/ensureAuthenticated";

export const customAuthChecker: AuthChecker = (
  props: any,
  roles,
) => {
  const { root, args, context, info } = props
  const auth = context.request.req.headers.authorization
  const isMobileClient = context.request.req.headers.mobile
  const userAccess = context.request.req.headers.user_access

  return ensureAuthenticated(auth, Number(userAccess), isMobileClient)
};