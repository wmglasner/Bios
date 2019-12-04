const fetch = require("node-fetch");


var base = 'https://eol.org/api/';
var pred='/pred_prey.json';
var pages='pages/';
//Predator/Prey Looping
export async function predPrey(id) {
    let predPreyList = await fetch(base+pages+id+pred);
    let listJson = await predPreyList.json()
    
    // let prey = base+pages+listJson.nodes[1].id+pred;
    // return await fetch(prey)
    // .then(response => {
    //     return response.json()
    // })
    // .then(data => {
    //     return data
    // });
    return listJson

}

async function profile(id) {
    return await fetch(base)
    .then((response) => {

    })
}

//Profile information 
module.exports = predPreyProfile = () => {
    fetch('https://eol.org/api/pages/620727/pred_prey.json')
    .then(response => {return response.json()})
    .then(data => {
        var prey = 'https://eol.org/api/pages/'+data.nodes[1].id+'/pred_prey.json';
        return fetch(prey);
    })
    .then(data=> {return data.json()})
    .then(response => {console.log(response)})
}
