import {useParams} from "react-router-dom";
import Api from "../util/SuperHeroApi";
import {useEffect, useRef, useState} from "react";
import {Subtitle, Text} from "../assets/style/global/classes";
import CharacterCard from "../components/CharacterCard";

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
        <div className={`grid place-items-center ${results.length === 0 ? 'h-full' : ''}`}>
            {results.length > 0 && (
                <div className={'flex flex-col gap-5 w-full'}>
                    <div className={'flex flex-wrap gap-2 p-5 pb-0 justify-between items-center max-sm:px-2.5'}>
                        <Subtitle fontSize={4}>
                            All results for <Text fontWeight={2}>{search}</Text>
                        </Subtitle>
                        <Text aside fontSize={2} className={'mr-1'}>{results.length} results</Text>
                    </div>
                    <div className={'grid px-5 pb-5 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' +
                        ' gap-5 h-full w-full max-sm:px-0'}>
                        {results.map((character) => <CharacterCard character={character} key={character.id}/>)}
                    </div>
                </div>
            ) || results.length === 0 && (
                <Text fontSize={4} aside className={'p-5'}>No supers were found for your search...</Text>
            )}
        </div>
    );
}