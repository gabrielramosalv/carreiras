import styled from "styled-components";
import {
    f_s_headline_3,
    header_height,
    p_aside_color_1,
    p_aside_color_2,
    p_main_color_1,
    p_main_color_2
} from "../assets/style/global/variables";
import {Text, Title} from "../assets/style/global/classes";
import {useEffect, useRef, useState} from "react";
import searchIcon from "../assets/media/icon/search.svg";
import closeIcon from "../assets/media/icon/x_white.svg";

const _Header = styled.div`
  border-bottom: 1px solid ${p_main_color_1};
`

const Nav = styled.div`
  height: ${header_height};
`

const SearchButton = styled.div`
  background: url(${searchIcon}) center no-repeat ${p_main_color_1};
  background-size: 70%;

  :hover {
    background-color: ${p_main_color_2};
  }

`

const Search = styled.div`
  display: none;
  font-size: ${f_s_headline_3};
  width: 100%;

  input {
    border: none;
    background-color: ${p_aside_color_1};
    color: ${p_aside_color_2};
  }
`

function Header({setSearch}) {

    const searchInput = useRef();
    const searchButton = useRef();

    const [isSearchShowing, setIsSearchShowing] = useState(true);
    useEffect(() => {
        if (isSearchShowing) {
            searchInput.current.removeAttribute("style");
            searchButton.current.removeAttribute("style");
        } else {
            searchInput.current.style.display = "flex";
            searchButton.current.style.backgroundImage = `url(${closeIcon})`;
            searchButton.current.style.backgroundSize = "40%";
        }
    }, [isSearchShowing]);

    return (
        <_Header className={'flex flex-col px-5 w-full justify-center'}>
            <Nav className={'flex justify-between items-center'}>
                <Title fontSize={4}>foundyour<Text fontWeight={2}>hero</Text></Title>
            </Nav>
            <SearchButton onClick={() => setIsSearchShowing(!isSearchShowing)}
                          className={'absolute right-5 rounded-full h-12 w-12 cursor-pointer'}
                          ref={searchButton}></SearchButton>
            <Search ref={searchInput} className={'cursor-text'}>
                <input type="text" className={'w-full h-full pb-4'} placeholder="Pesquise o herói ou vilão..."
                       onChange={e => setSearch(e.target.value)}/>
            </Search>
        </_Header>
    );
}

export default Header;