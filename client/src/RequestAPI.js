export function get(type, prompt, index, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `http://213.188.154.113:1337/get/${type}/${prompt}/${index}`);
    req.send();
}
export function random(type, size = 1, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {

        set(JSON.parse(target.responseText));
    });
    req.open("GET", `http://213.188.154.113:1337/random/${type}?size=${size}`);
    req.send();
}

export function SendLogin(Username, Password, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", "http://localhost:1337/login/");
    req.setRequestHeader("Username", Username);
    req.setRequestHeader("Password", Password);
    req.send();
}