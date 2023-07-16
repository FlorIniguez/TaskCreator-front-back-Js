import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();
//Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loadings, setLoadings] = useState(true);

  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    //despues de 5 segundos si hay errores los borra
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      //si ya no se usa destruye el timer
      return () => clearTimeout(timer);
    }
  }, [errors]);

//cuando cargo la pagina
  useEffect(() => {
    //obtener de cookies todos sus valores
    async function checkLogin() {
      const cookies = Cookies.get();
      //primero comprobar si no hay token 
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoadings(false);
        return setUser(null);
      }
      try {
        //si hay un token,mandalo al back y  verificalo
        const res = await verifyTokenRequest(cookies.token);
        //si no hay ningun dato
        if (!res.data) {
          setIsAuthenticated(false);
          setLoadings(false);
          return;
        }
        //si te esta dando un dato es que si hay un usuario
        setIsAuthenticated(true);
        setUser(res.data);
        setLoadings(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoadings(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singup,
        singin,
        user,
        isAuthenticated,
        errors,
        loadings,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
