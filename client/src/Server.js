//const ip = "http://213.188.154.113:1337";
const ip = "http://localhost:1337";

function prompt(type, prompt, index, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/prompt/${type}/${prompt}/${index}`);
    req.send();
}
function random(type, size = 1, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {

        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/random/${type}?size=${size}`);
    req.send();
}

function login(username, password, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/login`);
    req.setRequestHeader("username", username);
    req.setRequestHeader("password", password);
    req.send();
}
function signup(username, password, set) {
    const req = new XMLHttpRequest();
    req.addEventListener("load", ({ target }) => {
        set(JSON.parse(target.responseText));
    });
    req.open("GET", `${ip}/signup`);
    req.setRequestHeader("username", username);
    req.setRequestHeader("password", password);
    req.send();
}

const Server =  {
    prompt,
    random,
    login,
    signup,
}

export default Server;
