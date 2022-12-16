import delay from "./delay";
import Server from "./server";

export default class PromptFetcher {
    constructor(arraySetter) {
        this.arraySetter = arraySetter;
        this.prompt = undefined;
        this.shouldRun = false;
        this.isRunning = false;
        this.index = 0;
    }
    async start(prompt) {
        console.log(`fetcher-start: Starting fetch of ${prompt}`)
        if (this.isRunning) {
            console.log(`fetcher-start: Uh oh, another fetch is already running!`)
            this.shouldRun = false;
            console.log(`fetcher-start: Waiting for old fetch to shut down`)
            while (this.isRunning) { await delay(100); }
            console.log(`fetcher-start: Old fetch shut down!`)
            
        }
        this.index = 0;
        this.arraySetter(old => []);
        this.prompt = prompt;
        this.shouldRun = true;
        this.isRunning = true;
        console.log("fetcher-start: fetching from server")
        Server.prompt("laureate", this.prompt, this.index, (data) => { this.getNew(data) })
    }
    async getNew(possibleNewLaureate) {
        console.log("fetcher.getnew: " + this.prompt)
        console.log("fetcher.getnew: Got a result from the server!")
        if (this.shouldRun && possibleNewLaureate !== null) {
            console.log("fetcher-getnew: Got a new laureate!")
            this.arraySetter(old => [...old, possibleNewLaureate]);
            this.index++;
            console.log("fetcher-getnew: fetching from server")
            Server.prompt("laureate", this.prompt, this.index, (data) => { this.getNew(data) });
        } else {
            console.log("fetcher-getnew: premature shutdown: " + !this.shouldRun)
            console.log("fetcher-getnew: got the last fetch or got prematurily shut down");
            this.isRunning = false;
        }
    }
}