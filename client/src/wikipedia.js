
import { request } from "./server";

const Wikipedia = {
    GetImage(articleName, set, size = 512) {
        request(
            "GET",
            `https://en.wikipedia.org/w/api.php?action=query&titles=${articleName}&prop=pageimages&format=json&origin=*&pithumbsize=${size}`,
            null,
            (json) => {
                console.log("GOT THE DEETS", json); 
                const thumbnail = Object.values(json.query.pages)[0].thumbnail;
                set(thumbnail ? thumbnail.source : null)}
        );
        //https://en.wikipedia.org/w/api.php?action=query&titles=Al-Farabi&prop=pageimages&format=json&pithumbsize=100
    }
}
export default Wikipedia;