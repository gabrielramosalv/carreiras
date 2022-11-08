import {useEffect} from "react";
import {Input, Subtitle, Text} from "../assets/style/global/classes";
import Button from "../components/Button";
import addIcon from "../assets/media/icon/+_white.svg";
import styled from "styled-components";
import {p_aside_color_1d2, p_aside_color_1d4} from "../assets/style/global/variables";
import CharacterCard from "../components/CharacterCard";
import removeIcon from "../assets/media/icon/x_white.svg";

const LeagueNameInput = styled(Input)`
  border-bottom: 1px solid ${p_aside_color_1d2};
  background-color: ${p_aside_color_1d4};
`

export default ({setSearch, leagues, setLeagues}) => {

    useEffect(() => {
        setSearch(null);
    }, []);

    function createNewLeague() {
        const previousLeagues = [...leagues];
        previousLeagues.push({
            name: "New league",
            characters: []
        });
        setLeagues(previousLeagues);
    }

    function changeName(leagueIndex, name) {
        const previousLeagues = [...leagues];
        previousLeagues[leagueIndex].name = name;
        setLeagues(previousLeagues);
    }

    function removeLeague(leagueIndex){
        const previousLeagues = [...leagues];
        previousLeagues.splice(leagueIndex, 1);
        setLeagues(previousLeagues);
    }

    return (
        <div className={`flex flex-col ${leagues.length === 0 ? 'h-full' : ''} max-sm:px-0`}>
            <div className={'flex justify-between p-5 pb-0 max-sm:px-2.5'}>
                <Subtitle fontSize={4} fontWeight={2}>Your leagues</Subtitle>
                <Button msg={'New'} image={addIcon} onClick={createNewLeague}/>
            </div>
            {leagues.length > 0 && (
                <div className={'flex flex-col gap-5 mt-5'}>
                    {leagues.map((league, index) => (
                        <div className={'flex flex-col gap-5'} key={index}>
                            <div className={'flex justify-between gap-5 items-end'}>
                                <LeagueNameInput fontSize={3} className={'ml-5 pl-1 max-sm:ml-2.5 pb-2.5' +
                                    ' border-none max-sm:px-2.5 w-full'}
                                                 onChange={e => changeName(index, e.target.value)} value={league.name}/>
                                <Button msg={'Remove'} image={removeIcon} imageHeight={16} className={'mr-5' +
                                    ' max-sm:mr-2.5'} onClick={() => removeLeague(index)}/>
                            </div>
                            <div
                                className={'grid px-5 pb-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' +
                                    ' gap-5 h-full w-full max-sm:px-0'}>
                                {league.characters.map(character => (
                                    <CharacterCard character={character} showRemove={true} setLeagues={setLeagues}
                                                   leagueIndex={index} leagues={leagues}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) || (
                <div className={'grid place-items-center h-full w-full'}>
                    <Text fontSize={4} aside>You hasn't leagues yet...</Text>
                </div>
            )}
        </div>
    )
}