import './App.css';
import Header from "./components/Header";
import styled from "styled-components";
import {p_aside_color_1, p_main_color_2} from "./assets/style/global/variables";
import {useState} from "react";

const _App = styled.div`
  background-color: ${p_aside_color_1};
  color: ${p_main_color_2};
`

function App() {

    const [search, setSearch] = useState("");

    return (
        <_App className={'flex flex-col h-screen w-screen'}>
            <Header setSearch={setSearch}/>
        </_App>
    );
}

export default App;
