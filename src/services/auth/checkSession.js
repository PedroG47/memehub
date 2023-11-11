import { tokenService } from "./tokenService";

export default function checkSession() {
  const session = tokenService.get();
  const currentPath = window.location.pathname;

  if ((currentPath === '/' || currentPath === '/register') && session) {
    window.location.href = '/home';
    return true;
  }

  if ((currentPath !== '/' && currentPath !== '/register') && !session) {
    window.location.href = '/';
    return false;
  } else {
    return true;
  }
}
