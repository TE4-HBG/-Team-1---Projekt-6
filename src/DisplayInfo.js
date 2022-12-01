import handleSearch from "./handleSearch"
import NobelPrize from "./NobelPrize";

const temparray = handleSearch();

function display(){
    for (let i= 0; i<temparray.length; i++)
    {
        <NobelPrize data = {temparray[i]}/>
    }
}