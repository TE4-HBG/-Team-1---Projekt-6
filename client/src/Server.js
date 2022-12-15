import globals from "./globals";
//const ip = "http://213.188.154.113:1337";
const ip = "http://localhost:1337";
export function prompt(type, prompt, index, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/prompt/${type}/${prompt}/${index}`);
    req.send();
}
export function random(type, size = 1, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {

        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/random/${type}?size=${size}`);
    req.send();
}

export function login(username, password, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/login`);
    req.setRequestHeader("Username", username);
    req.setRequestHeader("Password", password);
    req.send();
}

export function addFavorite(type, id, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/addfavorite/${type}/${globals.userId}/${id}`);
    req.send();
}

const Server =  {
    prompt,
    random,
    login,
}

export default Server;