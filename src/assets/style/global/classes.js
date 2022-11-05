import styled from "styled-components";
import {
    f_s_headline_1,
    f_s_headline_2,
    f_s_headline_3,
    f_s_main_1,
    f_s_main_2,
    f_s_minor_1,
    f_s_minor_2,
    f_s_normal, f_w_bold, f_w_normal
} from "./variables";

// Text Classes

const FontSize = Object.freeze({
    '-2': f_s_minor_1,
    '-1': f_s_minor_2,
    1: f_s_normal,
    2: f_s_headline_1,
    3: f_s_headline_2,
    4: f_s_headline_3,
    5: f_s_main_1,
    6: f_s_main_2
});

const FontWeight = Object.freeze({
    1: f_w_normal,
    2: f_w_bold
})

export const Text = styled.span `
  font-size: ${props => FontSize[props.fontSize]};
  font-weight: ${props => props.fontWeight != null ? FontWeight[props.fontWeight] : f_w_normal};
`;

export const Title = Text.withComponent('h1');
export const Subtitle = Text.withComponent('h2');