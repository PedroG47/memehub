import Cookies from 'js-cookie';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';

export const tokenService = {
  save(accessToken) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken); 
  },
  get() {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },
  delete() {
    Cookies.remove(ACCESS_TOKEN_KEY);
  },
};
