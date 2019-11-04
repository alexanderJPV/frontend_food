export const SERVER = (function () {
    const URL = {
        BASE: 'http://localhost:3000/api'
    };
    const AUTHENTICATE = 'authenticate';
    const ACCOUNT = 'account';
    const REGISTER = 'register';
    const ACTIVATE = 'activate?key=';
    const RESET_PASSWORD_INIT = 'reset-password/init';
    const RESET_PASSWORD_FINISH = 'reset-password/finish';
    const USERS = 'usuarios';
    const SUCURSALES = 'sucursales';
    const PLATOS = 'platos';
    const ROLES = 'roles';
    const TIPOS = 'tipos';
    return {
        URL_BASE: URL.BASE,
        AUTHENTICATE: `${URL.BASE}/${AUTHENTICATE}`,
        ACCOUNT: `${URL.BASE}/${ACCOUNT}`,
        REGISTER: `${URL.BASE}/${REGISTER}`,
        ACTIVATE: `${URL.BASE}/${ACTIVATE}`,
        USERS: `${URL.BASE}/${USERS}`,
        RESET_PASSWORD_INIT: `${URL.BASE}/${ACCOUNT}/${RESET_PASSWORD_INIT}`,
        RESET_PASSWORD_FINISH: `${URL.BASE}/${ACCOUNT}/${RESET_PASSWORD_FINISH}`,
        ROLES: `${URL.BASE}/${ROLES}`,
        LISTROLES: `${URL.BASE}/${USERS}/${ROLES}`,
        SUCURSALES: `${URL.BASE}/${SUCURSALES}`,
        LISTTIPOS: `${URL.BASE}/${SUCURSALES}/${TIPOS}`,
        PLATOS: `${URL.BASE}/${PLATOS}`
    };
})();

