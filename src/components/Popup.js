import styled from "styled-components";
import {p_aside_color_1} from "../assets/style/global/variables";
import {Text} from "../assets/style/global/classes";
import Button from "./Button";
import closeIcon from "../assets/media/icon/x_white.svg";
import {useEffect, useRef} from "react";

const PopupContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`

const _Popup = styled.div`
  background-color: ${p_aside_color_1};
  max-width: ${props => props.size}px;
  width: 100%;
`

function Popup({title, content, size, condition, setCondition}) {

    const container = useRef();

    useEffect(()=>{
        if(condition) {
            container.current.style.display = "grid";
        } else {
            container.current.style.display = "none";
        }
    }, [condition]);

    function close() {
        container.current.style.display = "none";
        setCondition(false);
    }

    return (
        <PopupContainer className={'grid place-items-center h-screen w-screen fixed z-20 left-0 top-0'} ref={container}>
            <_Popup className={'flex flex-col rounded-xl p-5 drop-shadow-lg gap-5'} size={size}>
                <div className={'flex justify-between items-center'}>
                    <Text fontSize={3} fontWeight={2}>{title}</Text>
                    <Button image={closeIcon} imageHeight={18} onClick={close}></Button>
                </div>
                {content}
            </_Popup>
        </PopupContainer>
    );
}

Popup.defaultProps = {
    size: 600
}

export default Popup;