import './App.css';
import Header from "./layout/Header";
import styled from "styled-components";
import {header_height, p_aside_color_1d4, p_main_color_1, p_main_color_2} from "./assets/style/global/variables";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Character from "./pages/Character";
import Leagues from "./pages/Leagues";

const _App = styled.div`
  color: ${p_main_color_2};

  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-thumb {
    background: ${p_main_color_1};
  }
`

const Main = styled.main`
  height: calc(100vh - ${header_height});
  background-color: ${p_aside_color_1d4};
`

function App() {

    const [search, setSearch] = useState(null);
    const [leagues, setLeagues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (search != null && search.length >= 0) {
            navigate("/search/" + search.toLowerCase())
        }
    }, [search]);

    return (
        <_App className={'flex flex-col h-screen w-screen overflow-y-hidden'}>
            <Header setSearch={setSearch} search={search}/>
            <Main className={'overflow-y-auto'}>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route path="/search/:search" element={<Search setSearch={setSearch} search={search}/>}></Route>
                    <Route path="/search" element={<Search setSearch={setSearch} search={search}/>}></Route>
                    <Route path="/characters/:id" element={<Character setSearch={setSearch} leagues={leagues} setLeagues={setLeagues}/>}></Route>
                    <Route path="/leagues" element={<Leagues setSearch={setSearch} leagues={leagues}
                                                             setLeagues={setLeagues}/>}></Route>
                </Routes>
            </Main>
        </_App>
    );
}

export default App;
