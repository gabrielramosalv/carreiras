import {
    p_aside_color_1d2,
    p_aside_color_2,
    p_blue_color_1,
    p_blue_color_2,
    p_red_color_1,
    p_red_color_2
} from "../assets/style/global/variables";

export default Object.freeze({
    'good': {
        asideColor: p_blue_color_1,
        mainColor: p_blue_color_2,
        name: "HERO"
    },
    'neutral': {
        asideColor: p_aside_color_1d2,
        mainColor: p_aside_color_2,
        name: "NEUTRAL"
    },
    '-': {
        asideColor: p_aside_color_1d2,
        mainColor: p_aside_color_2,
        name: "NEUTRAL"
    },
    'bad': {
        asideColor: p_red_color_1,
        mainColor: p_red_color_2,
        name: "VILLAIN"
    }
});