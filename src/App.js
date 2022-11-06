import './App.css';
import Header from "./components/Header";
import styled from "styled-components";
import {header_height, p_aside_color_1, p_main_color_1, p_main_color_2} from "./assets/style/global/variables";
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Character from "./pages/Character";

const _App = styled.div`
  background-color: ${p_aside_color_1};
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
`

function App() {

    const [search, setSearch] = useState(null);
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
                    <Route path="/characters/:id" element={<Character setSearch={setSearch}/>}></Route>
                </Routes>
            </Main>
        </_App>
    );
}

export default App;
