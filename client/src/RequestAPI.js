
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

export function SendLogin(Username, Password, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/login`);
    req.setRequestHeader("Username", Username);
    req.setRequestHeader("Password", Password);
    req.send();
}
