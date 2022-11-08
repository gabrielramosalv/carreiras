import CharacterAlignmentEnum from "../types/CharacterAlignmentEnum";
import {Text} from "../assets/style/global/classes";
import {Link} from "react-router-dom";
import Button from "./Button";
import removeIcon from "../assets/media/icon/x_white.svg";
import styled from "styled-components";
import {p_aside_color_1, p_aside_color_1d2} from "../assets/style/global/variables";

const CharacterImage = styled.div`
  background: url(${props => props.src}) center no-repeat;
  background-size: 100%;
  transition: background 0.3s;
`

const CardContainer = styled(Link)`
  border: 1px solid ${p_aside_color_1d2};
  height: 400px;
  background-color: ${p_aside_color_1};

  :hover > ${CharacterImage} {
    background-size: 105%;
  }
`

function CharacterCard({character, showRemove, leagueIndex, setLeagues, leagues}) {
    const characterAlignmentDefinition = CharacterAlignmentEnum[character.biography.alignment];

    function removeCharacter(e) {
        e.preventDefault();
        let oldLeagues = [...leagues];
        let characterLeague = oldLeagues[leagueIndex];
        characterLeague.characters.forEach((currentCharacter, index) => {
            if(currentCharacter.id == character.id) {
                characterLeague.characters.splice(index, 1);
            }
        });
        oldLeagues[leagueIndex] = characterLeague;
        setLeagues(oldLeagues);
    }

    return (
        <CardContainer
            className={'flex flex-col overflow-hidden w-full p-2.5 gap-2.5 rounded-xl max-sm:rounded-none'}
            to={'/characters/' + character.id}>
            <CharacterImage src={character.image.url} className={'rounded-md h-full'}/>
            <div className={`flex flex-col gap-2.5 py-2.5 mx-0.5 justify-end`}>
                <div className={'flex flex-col'}>
                    <Text color={characterAlignmentDefinition.mainColor} fontWeight={2} fontSize={-1}
                          className={'leading-tight'}>
                        {characterAlignmentDefinition.name}
                    </Text>
                    <Text fontSize={3} fontWeight={2}>{character.name}</Text>
                    <Text className={'leading-tight'}>
                        {character.biography["full-name"] = character.biography["full-name"].length > 0 ?
                            character.biography["full-name"] : "-"}
                    </Text>
                </div>
                {showRemove && (<Button msg={'Remove'} image={removeIcon} imageHeight={16} className={'self-end'} onClick={removeCharacter}/>)}
            </div>
        </CardContainer>
    );
}

CharacterCard.defaultProps = {
    showRemove: false
}

export default CharacterCard;