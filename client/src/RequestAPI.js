export function getCount(set) {
    const req = new XMLHttpRequest();
        req.addEventListener("load", ({ target }) => {
            set(JSON.parse(target.responseText).meta.count);
        });
        req.open("GET", "https://api.nobelprize.org/2.0/nobelPrizes?limit=0");
        req.send();
}
export function get(offset, limit, set) {
    const req = new XMLHttpRequest();
            req.addEventListener("load", ({ target }) => {
                set(JSON.parse(target.responseText).nobelPrizes);
            });
            req.open("GET", `https://api.nobelprize.org/2.0/nobelPrizes?limit=${limit}&offset=${offset}`);
            req.send();
}

export function SendLogin(Username, Password, set){
    const req = new XMLHttpRequest();
            req.addEventListener("load", ({ target }) => {
                set(JSON.parse(target.responseText));
            });
            req.open("GET", "");
            req.setRequestHeader("Username",Username);
            req.setRequestHeader("Password", Password);
            req.send();
}