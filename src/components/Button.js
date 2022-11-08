import styled from "styled-components";
import {p_aside_color_1, p_aside_color_1d2, p_main_color_1, p_main_color_2} from "../assets/style/global/variables";
import PropTypes from "prop-types";

const ButtonContainer = styled.button`
  background-color: ${props => !props.transparent ? p_main_color_1 : p_aside_color_1};
  color: ${props => !props.transparent ? p_aside_color_1 : p_main_color_2};
  border: ${props => !props.transparent ? 'none' : '1px solid ' + p_main_color_1};
  white-space: nowrap;
  :hover {
    background-color: ${props => !props.transparent ? p_main_color_2 : p_aside_color_1d2};
  }
`

const ButtonImage = styled.img`
  height: ${props => props.height}px;
`

function Button({msg, image, imageHeight, transparent, onClick, className}) {
    return (
        <ButtonContainer
            className={`flex gap-3 items-center rounded-full cursor-pointer h-11 ${msg != null ? 'px-5 w-fit' : 'w-11'} 
                items-center justify-center ${className}`}
            transparent={transparent}
            onClick={onClick}
        >
            {msg != null && msg}
            {image != null && <ButtonImage src={image} height={imageHeight}/>}
        </ButtonContainer>
    );
}

Button.propTypes = {
    imageHeight: PropTypes.number
}

Button.defaultProps = {
    transparent: false,
    imageHeight: 20
}

export default Button;