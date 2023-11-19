import axios from 'axios';
import { tokenService } from '../services/auth/tokenService';

export default async function request(url, method, params) {
  const path = `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`;
  let authorization = {};

  if (method === 'post' && url === '/user') {
    try {
      const response = await axios.post(path, params);
      return { data: response.data };
    } catch (error) {
      console.error(error);
      return { data: null, error: 'Ocorreu um erro ao obter os dados da API.' };
    }
  } else {
    const session = tokenService.get();
    if (session) {
      authorization = {
        headers: {
          Authorization: `Bearer ${session}`
        }
      };
    }
  }

  try {
    let response;
    if (method === 'post') {
      response = await axios.post(path, params, authorization);
    } else if (method === 'put'){
      response = await axios.put(path, params, authorization);
    } else {
      response = await axios.get(path, authorization);
    }
    
    return { data: response.data }
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Ocorreu um erro ao obter os dados da API.' }
  }
}
