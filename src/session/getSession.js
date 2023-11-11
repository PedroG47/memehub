import { tokenService } from "../services/auth/tokenService";

export default function getSession() {
    const session = tokenService.get();
    return session ? session : false;
}
  