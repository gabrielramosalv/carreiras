import axios from "axios";

const SUPER_HERO_API_URL = "https://www.superheroapi.com/api";
const SUPER_HERO_API_KEY = "2337927019700639";

const SUPER_HERO_API_COMPLETE_URL = SUPER_HERO_API_URL + "/" + SUPER_HERO_API_KEY;

export default class {

    static getByName(name) {
        return axios.get(SUPER_HERO_API_COMPLETE_URL + "/search/" + name);
    }

    static getById(id){
        return axios.get(SUPER_HERO_API_COMPLETE_URL + "/" + id);
    }

}