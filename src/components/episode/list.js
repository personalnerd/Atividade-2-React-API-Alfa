import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import EpisodeItem from "./item";

export default function EpisodeList({setModal}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    
    let arr = []
    while (arr.length < 3) {
        var r = Math.floor(Math.random() * 41) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/episode/${arr}`)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json)
            })
    }, []);

    function handleClick(url) {
        setModal({type: 'EpisodeInfo', url: url})
    }

    function clickSearch() {
        setModal({type: 'EpisodeSearch'})
    }
    return (
        <section className="col">
            <h2>Episodes <FontAwesomeIcon className="search-icon" icon={faSearch} onClick={() => clickSearch()} /></h2>
            {!isLoaded && <div>Carregando...</div>}
            <div className="episode-list">
                {error ? <div>Erro</div> :
                    data?.map(item => (
                        <EpisodeItem
                            key={item.id}
                            episode={item}
                            handleClick={handleClick}
                        />
                    ))
                }
            </div>
        </section>
    )
}