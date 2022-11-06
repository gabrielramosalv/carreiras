import styled from "styled-components";
import {p_aside_color_1, p_aside_color_1d2, p_main_color_1, p_main_color_2} from "../assets/style/global/variables";

const Button = styled.button`
  background-color: ${props => !props.transparent ? p_main_color_1 : p_aside_color_1};
  color: ${props => !props.transparent ? p_aside_color_1 : p_main_color_2};
  border: ${props => !props.transparent ? 'none' : '1px solid ' + p_main_color_1};

  :hover {
    background-color: ${props => !props.transparent ? p_main_color_2 : p_aside_color_1d2};
  }
`

const ButtonImage = styled.img`
  height: ${props => props.height == null ? '22' : props.height}px
`

export default ({msg, image, imageHeight, transparent}) => {
    return (
        <Button
            className={['flex gap-3 items-center rounded-full cursor-pointer h-12', msg != null ? 'px-6 w-fit' : 'w-12 items-center justify-center']}
            transparent={transparent != null}
        >
            {msg != null && msg}
            {image != null && <ButtonImage src={image} height={imageHeight}/>}
        </Button>
    );
}