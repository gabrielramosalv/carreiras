import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SuperHeroApi from "../util/SuperHeroApi";
import {Subtitle, Text, Title} from "../assets/style/global/classes";
import styled from "styled-components";
import CharacterAlignmentEnum from "../types/CharacterAlignmentEnum";
import {f_s_minor_2, p_aside_color_1, p_aside_color_1d2} from "../assets/style/global/variables";
import addIcon from "../assets/media/icon/+_white.svg";
import Button from "../components/Button";
import Popup from "../components/Popup";

const CharacterContainer = styled.div`
  border: 1px solid ${p_aside_color_1d2};
  max-width: ${props => props.hasImage ? 1000 : 500}px;
  width: 100%;
  background-color: ${p_aside_color_1};
`

const CharacterImageSeparator = styled.div`
  background-color: ${p_aside_color_1d2};
  height: 100%;
  width: 1px;
`

const CharacterStatsBar = styled.div`
  height: 100px;
  clip-path: inset(${props => 100 - props.height}% 0 0 0);
  width: 12px;
  background-color: ${props => props.color};
`

const CharacterDetailsHeader = styled.div`
  background-image: linear-gradient(${p_aside_color_1} 90%, transparent);
`

const LeagueButton = styled.div`
  border: 1px solid ${p_aside_color_1d2};
  
  :hover {
    background-color: ${p_aside_color_1d2};
  }
`

export default ({setSearch, leagues, setLeagues}) => {

    const {id} = useParams();
    const [character, setCharacter] = useState(null);
    const [characterAlignmentDefinition, setCharacterAlignmentDefinition] = useState(null);
    const [hasImage, setHasImage] = useState(true);
    const [showChoiceTeam, setShowChoiceTeam] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setSearch(null);
        SuperHeroApi.getById(id).then((response) => {
            let success = response.data.response === "success" ? true : false;
            if (success) {
                formatCharacterData(response.data);
                setCharacter(response.data);
            }
        });
    }, []);

    function formatCharacterData(character) {
        // Formatando dados pessoais.
        character.biography['full-name'] = character.biography['full-name'].length > 0 ? character.biography['full-name'] : '-';
        character.biography['alter-egos'] = character.biography['alter-egos'] === 'No alter egos found.' ? '-' : character.biography['alter-egos'];

        // Formatando os status de poderes.
        let powerstats = character.powerstats;
        if (powerstats.intelligence == "null" && powerstats.strength == "null" && powerstats.speed
            && powerstats.durability && powerstats.combat) {
            character.powerstats = null;
        }

        // Formatando os dados de aparência.
        let weights = character.appearance.weight
            .filter(weight => !weight.includes("-") && !weight.startsWith("0"));
        character.appearance.weight = weights.length > 0 ? weights.join(", ") : "-";
        let heights = character.appearance.height
            .filter(height => !height.includes("-") && !height.startsWith("0"));
        character.appearance.height = heights.length > 0 ? heights.join(", ") : "-";
        character.appearance.race = character.appearance.race == "null" ? "-" : character.appearance.race;
    }

    function addToLeague(leagueId){
        const previousLeagues = [...leagues];
        previousLeagues[leagueId].characters.push(character);
        setLeagues(previousLeagues);
        setShowChoiceTeam(false);
        navigate("/leagues");
    }

    useEffect(() => {
        if (character != null) {
            setCharacterAlignmentDefinition(CharacterAlignmentEnum[character.biography.alignment]);
        }
    }, [character]);

    return (
        <div className={'grid place-items-center w-full p-5'}>
            {character != null && characterAlignmentDefinition != null && (
                <CharacterContainer className={'flex gap-5 items-start px-5 h-full rounded-xl ' +
                    'max-md:flex-col max-lg:h-fit'} hasImage={hasImage}>
                    <Popup title="Choice team" condition={showChoiceTeam} setCondition={setShowChoiceTeam}
                           content={
                               <div className={'flex flex-col gap-2.5'}>
                                   {leagues.map((league, index) => (
                                       <LeagueButton
                                           key={index}
                                           className={'p-2.5 rounded-md w-full cursor-pointer'}
                                           onClick={() => addToLeague(index)}
                                       >
                                           {league.name}
                                       </LeagueButton>)
                                   )}
                               </div>
                           }
                    />
                    {hasImage && (
                        <>
                            <img
                                src={character.image.url}
                                className={'rounded-md w-4/12 sticky top-5 mt-5 ' +
                                    'max-lg:relative max-lg:mt-0 max-md:w-full'}
                                onError={() => setHasImage(false)}
                            />
                            <CharacterImageSeparator className={'max-lg:hidden'}/>
                        </>
                    )}
                    <div className={`flex flex-col gap-8 w-full`}>
                        <CharacterDetailsHeader
                            className={'flex items-center gap-2 justify-between sticky ' +
                                'top-0 z-10 pt-5 pb-5'}>
                            <div className={'flex flex-col'}>
                                <Text color={characterAlignmentDefinition.mainColor} fontWeight={2} fontSize={-1}>
                                    {characterAlignmentDefinition.name}
                                </Text>
                                <Title fontSize={4} fontWeight={2}>{character.name}</Title>
                            </div>
                            <Button msg={'Add to team'} image={addIcon} onClick={() => setShowChoiceTeam(true)}/>
                        </CharacterDetailsHeader>
                        {character.powerstats != null && (
                            <div className={'flex justify-between flex-wrap gap-5 px-2 max-sm:justify-center'}>
                                {character.powerstats.intelligence != "null" && (
                                    <div className={'flex flex-col justify-end gap-2 leading-none h-full'}>
                                        <CharacterStatsBar height={character.powerstats.intelligence}
                                                           color={characterAlignmentDefinition.mainColor}/>
                                        <Text>Intelligence</Text>
                                        <Text color={characterAlignmentDefinition.mainColor}
                                              fontWeight={2}> {character.powerstats.intelligence}%</Text>
                                    </div>
                                )}
                                {character.powerstats.strength != "null" && (
                                    <div className={'flex flex-col' +
                                        ' justify-end gap-2 leading-none h-full'}>
                                        <CharacterStatsBar height={character.powerstats.strength}
                                                           color={characterAlignmentDefinition.mainColor}/>
                                        <Text>Strength</Text>
                                        <Text color={characterAlignmentDefinition.mainColor}
                                              fontWeight={2}> {character.powerstats.strength}%</Text>
                                    </div>
                                )}
                                {character.powerstats.speed != "null" && (
                                    <div className={'flex flex-col justify-end gap-2 leading-none h-full'}>
                                        <CharacterStatsBar height={character.powerstats.speed}
                                                           color={characterAlignmentDefinition.mainColor}/>
                                        <Text>Speed</Text>
                                        <Text color={characterAlignmentDefinition.mainColor}
                                              fontWeight={2}> {character.powerstats.speed}%</Text>
                                    </div>
                                )}
                                {character.powerstats.durability != "null" && (
                                    <div className={'flex flex-col justify-end gap-2 leading-none h-full'}>
                                        <CharacterStatsBar height={character.powerstats.durability}
                                                           color={characterAlignmentDefinition.mainColor}/>
                                        <Text>Durability</Text>
                                        <Text color={characterAlignmentDefinition.mainColor}
                                              fontWeight={2}> {character.powerstats.durability}%</Text>
                                    </div>
                                )}
                                {character.powerstats.combat != "null" && (
                                    <div className={'flex flex-col justify-end gap-2 leading-none h-full'}>
                                        <CharacterStatsBar height={character.powerstats.combat}
                                                           color={characterAlignmentDefinition.mainColor}/>
                                        <Text>Combat</Text>
                                        <Text color={characterAlignmentDefinition.mainColor}
                                              fontWeight={2}> {character.powerstats.combat}%</Text>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={'flex flex-col gap-5 px-2'}>
                            <Subtitle fontSize={2}>General information</Subtitle>
                            <div className={'flex justify-between gap-5'}>
                                <div className={'flex flex-col gap-5 w-4/12'}>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Full name</Text>
                                        <Text>{character.biography['full-name']}</Text>
                                    </Text>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Aliases</Text>
                                        <div className={'flex flex-col'}>
                                            {character.biography.aliases.map((aliase, index) => <Text
                                                key={index}>{aliase}</Text>)}
                                        </div>
                                    </Text>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Alter egos</Text>
                                        <Text>{character.biography['alter-egos']}</Text>
                                    </Text>
                                </div>
                                <div className={'flex flex-col gap-5'}>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Gender</Text>
                                        <Text>{character.appearance.gender}</Text>
                                    </Text>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Race</Text>
                                        <Text>{character.appearance.race}</Text>
                                    </Text>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Height</Text>
                                        <Text>{character.appearance.height}</Text>
                                    </Text>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Weight</Text>
                                        <Text>{character.appearance.weight}</Text>
                                    </Text>
                                </div>
                                <div className={'flex flex-col gap-5'}>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Eye color</Text>
                                        <Text>{character.appearance['eye-color']}</Text>
                                    </Text>
                                    <Text className={'flex flex-col gap-1'}>
                                        <Text aside>Hair color</Text>
                                        <Text>{character.appearance['hair-color']}</Text>
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-5 px-2'}>
                            <Subtitle fontSize={2}>Connections</Subtitle>
                            <div className={'flex flex-col gap-1'}>
                                <Text aside>Group affiliations</Text>
                                <Text>{character.connections['group-affiliation']}</Text>
                            </div>
                            <div className={'flex flex-col gap-1'}>
                                <Text aside>Relatives</Text>
                                <Text>{character.connections.relatives}</Text>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-5 px-2 mb-5'}>
                            <Subtitle fontSize={2}>Other information</Subtitle>
                            <div className={'flex gap-2'}>
                                <Text aside>Publisher</Text>
                                <Text>{character.biography.publisher}</Text>
                            </div>
                            <div className={'flex gap-2'}>
                                <Text aside>First Appearance</Text>
                                <Text>{character.biography['first-appearance']}</Text>
                            </div>
                            <div className={'flex gap-2'}>
                                <Text aside>Place of birth</Text>
                                <Text>{character.biography['place-of-birth']}</Text>
                            </div>
                            <div className={'flex gap-2'}>
                                <Text aside>Occupations</Text>
                                <Text>{character.work.occupation}</Text>
                            </div>
                            <div className={'flex gap-2'}>
                                <Text aside>Allocations</Text>
                                <Text>{character.work.base}</Text>
                            </div>
                        </div>
                    </div>
                </CharacterContainer>
            )}
        </div>
    );
}
