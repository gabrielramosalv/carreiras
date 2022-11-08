import styled from "styled-components";
import {
    f_s_headline_3,
    header_height,
    p_aside_color_1,
    p_aside_color_1d2,
    p_aside_color_2,
    p_main_color_1,
    p_main_color_2
} from "../assets/style/global/variables";
import {Text, Title} from "../assets/style/global/classes";
import {useEffect, useRef, useState} from "react";
import searchIcon from "../assets/media/icon/search.svg";
import closeIcon from "../assets/media/icon/x_white.svg";
import Button from "../components/Button";
import {Link} from "react-router-dom";
import starIcon from "../assets/media/icon/start_white.svg";

const Header = styled.header`
  border-bottom: 1px solid ${p_aside_color_1d2};
  background-color: ${p_aside_color_1};
`

const Logo = styled.div`
  height: ${header_height};
`

const SearchButton = styled.div`
  background: url(${searchIcon}) center no-repeat ${p_main_color_1};
  background-size: 60%;

  :hover {
    background-color: ${p_main_color_2};
  }
`

const Search = styled.input`
  display: none;
  font-size: ${f_s_headline_3};
  width: 100%;
  border: none;
  background-color: ${p_aside_color_1};
  color: ${p_aside_color_2};
`

export default ({setSearch, search}) => {

    const searchInput = useRef();
    const searchButton = useRef();

    const [isSearchingHidden, setIsSearchingHidden] = useState(true);

    useEffect(() => {
        if (search != null) {
            setIsSearchingHidden(false);
        } else {
            setIsSearchingHidden(true);
        }
    }, [search]);

    useEffect(() => {
        if (isSearchingHidden) {
            searchInput.current.removeAttribute("style");
            searchButton.current.removeAttribute("style");
        } else {
            searchInput.current.style.display = "flex";
            searchButton.current.style.backgroundImage = `url(${closeIcon})`;
            searchButton.current.style.backgroundSize = "35%";
            searchInput.current.focus();
        }
    }, [isSearchingHidden]);

    return (
        <Header className={'flex flex-col px-5 w-full max-sm:px-2.5 max-sm:gap-5 max-sm:pb-5'}>
            <div className={'flex items-center justify-between max-sm:flex-col'}>
                <Logo className={'flex justify-between items-center'} to={'/'}>
                    <Title fontSize={4}>your<Text fontWeight={2}>superleague</Text></Title>
                </Logo>
                <div className={'flex gap-2.5'}>
                    <Link to="/leagues">
                        <Button msg={'Leagues'} image={starIcon} imageHeight={19}/>
                    </Link>
                    <SearchButton onClick={() => setIsSearchingHidden(!isSearchingHidden)}
                                  className={'rounded-full h-11 w-11 cursor-pointer'}
                                  ref={searchButton}/>
                </div>
            </div>
            <Search ref={searchInput} className={'w-full pb-4 max-sm:text-center'} type="text"
                    placeholder="Search for your super hero, villain or antihero"
                    onChange={e => setSearch(e.target.value)}
                    value={search || ""} spellCheck={false}/>
        </Header>
    );
}