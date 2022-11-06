import {Link, useParams} from "react-router-dom";
import Api from "../util/SuperHeroApi";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Text} from "../assets/style/global/classes";
import {p_aside_color_1, p_main_color_2} from "../assets/style/global/variables";
import Button from "../components/Button";
import nextIcon from "../assets/media/icon/next.svg";
import addIcon from "../assets/media/icon/+_white.svg";
import CharacterAlignmentEnum from "../types/CharacterAlignmentEnum";

const CharacterImage = styled.img`
  background-size: 100%;
  width: 55%;
`

const CardContainer = styled.div`
  border: 1px solid ${p_main_color_2};
  height: 356px;

  :hover > ${CharacterImage} {
    background-size: 105%;
  }
`

const CharacterPanel = styled.div`
  background-color: ${p_aside_color_1};
  filter: drop-shadow(4px 0 18px rgb(0 0 0 / 0.2));
`

function Card({character}) {

    const [hasImage, setHasImage] = useState(true);
    const characterAlignmentDefinition = CharacterAlignmentEnum[character.biography.alignment];

    return (
        <CardContainer className={'rounded-xl flex justify-between overflow-hidden w-full relative'}>
            <CharacterPanel
                className={`flex flex-col rounded-r-xl p-5 justify-between z-10 ${hasImage ? 'w-2/4' : 'w-full'}`}>
                <div className={'flex flex-col gap-2'}>
                    <Text color={characterAlignmentDefinition.mainColor} fontWeight={2} fontSize={-1}>
                        {characterAlignmentDefinition.name}
                    </Text>
                    <Text fontSize={4} fontWeight={2} className={'leading-tight'}>{character.name}</Text>
                    <Text fontSize={2} className={'leading-tight'}>{character.biography["full-name"]}</Text>
                </div>
                <div className={'flex flex-col gap-2.5'}>
                    <Link to={'/characters/' + character.id}>
                        <Button msg={'Check'} image={nextIcon} imageHeight={19} transparent/>
                    </Link>
                    <Button msg={'Add to team'} image={addIcon}/>
                </div>
            </CharacterPanel>
            <CharacterImage src={character.image.url} className={'absolute h-full right-0'}
                            onError={() => setHasImage(false)}/>
        </CardContainer>
    );
}

export default ({setSearch}) => {

    const {search} = useParams();
    const [results, setResults] = useState([]);
    const lastSearch = useRef("");

    useEffect(() => {
        setSearch(search);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (search === undefined) {
                setResults([]);
                return;
            }
            if (search == lastSearch.current) {
                return;
            }
            lastSearch.current = search;
            Api.getByName(search).then((response => {
                const success = response.data.response === "success" ? true : false;
                if (!success) {
                    setResults([]);
                } else {
                    setResults(response.data.results);
                }
            }));
        }, 500);
        return () => clearInterval(interval);
    }, [search]);

    return (
        <div className={`p-5 grid place-items-center ${results.length === 0 ? 'h-full' : ''}`}>
            {results.length > 0 && (
                <div className={'grid grid-cols-3 gap-5 auto-rows-min place-items-center h-full w-full'}>
                    {results.map((character, index) => <Card character={character} key={index}/>)}
                </div>
            )}
            {results.length === 0 && <Text fontSize={4} aside>No supers were found for your search...</Text>}
        </div>
    );
}