/**  functions that bots will make calls on to obtain info 
    using FFXIV API **/
const fetch = require("node-fetch");
const config = require('../config.json');


const XIVINFO = {
    key: config.key,

    getCharacterID: async(name, server) => {
        /* gets character ID to be saved into db */


        let response = await fetch(`https://xivapi.com/character/search?name=${name}&server=${server}&private_key=${XIVINFO.key}`);
        let data = await response.json();

        if(data["Pagination"].Results == 0){
            return null;
        }

        return data;
    },

    getCharacter: async (id) => {
        /* gets character lodestone profile by id*/
        
        response = await fetch(`https://xivapi.com/character/${id}?data=CJ,FC,AC`);
        data = await response.json();

        return data;
    },

    getFreeCompany: async (name, server) => {
        /* get free company information */

        let response = await fetch(`https://xivapi.com/freecompany/search?name=${name}&server=${server}`);
        let data = await response.json();

        if(data["Pagination"].Results == 0){
            return null;
        }

        response = await fetch(`https://xivapi.com/freecompany/${data["Results"][0].ID}`);
        data = await response.json();

        return data;
    }


}

module.exports = XIVINFO;