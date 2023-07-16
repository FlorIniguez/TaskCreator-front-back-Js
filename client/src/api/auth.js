import axios from './axios'
//importo axios desde mi archivo axios

//crea un register te van a pasar un usuario y la vas a pasar por post a /register con ese usuario
export const registerRequest = (user) => axios.post(`/register`,user)

export const loginRequest = user => axios.post(`/login`,user)

export const verifyTokenRequest = () => axios.get( '/verify')

