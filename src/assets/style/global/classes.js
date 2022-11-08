import styled from "styled-components";
import {
    f_s_headline_1,
    f_s_headline_2,
    f_s_headline_3,
    f_s_hero_title,
    f_s_main_1,
    f_s_main_2,
    f_s_minor_1,
    f_s_minor_2,
    f_s_normal,
    f_w_bold,
    f_w_normal,
    p_aside_color_2,
    p_main_color_2
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
    6: f_s_main_2,
    7: f_s_hero_title
});

const FontWeight = Object.freeze({
    1: f_w_normal,
    2: f_w_bold
})

export const Text = styled.span.attrs(props => props.className)`
  font-size: ${props => FontSize[props.fontSize]};
  font-weight: ${props => props.fontWeight != null ? FontWeight[props.fontWeight] : f_w_normal};
  color: ${props => props.aside != null ? p_aside_color_2 : props.color != null ? props.color : p_main_color_2};
  white-space: ${props => props['nowrap'] != null ? 'nowrap' : 'normal'};
`;

export const Title = Text.withComponent('h1');
export const Subtitle = Text.withComponent('h2');
export const Input = Text.withComponent('input');