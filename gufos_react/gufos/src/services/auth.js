// Define a constante usuarioAutenticado que verifica se há um token no localstorage
export const usuarioAutenticado = () => localStorage.getItem("usuario-gufos") !== null;

// Define a constante parJWT 
export const parseJWT = () => {
    // Define a variavel base64 que recebe o payload do token
    let base64 = localStorage.getItem("usuario-gufos").split('.')[1];

    // Retorna o payload convertido de base64 para string e de string para JSON
    return JSON.parse(window.atob(base64));
}