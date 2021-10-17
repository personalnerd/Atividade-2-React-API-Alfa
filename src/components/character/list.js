import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import CharacterItem from './item'
import { useEffect, useState } from 'react';

export default function CharacterList({setModal}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    let arr = []
    while (arr.length < 3) {
        var r = Math.floor(Math.random() * 671) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${arr}`)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json)
            })
    }, []);

    function clickCharacter(id) {
        setModal({type: 'CharacterInfo', id: id})
    }

    function clickSearch() {
        setModal({type: 'CharacterSearch'})
    }

    return (
        <section className="col">
            <h2>Characters <FontAwesomeIcon className="search-icon" icon={faSearch} onClick={() => clickSearch()} /></h2>
            {!isLoaded && <div>Carregando...</div>}
            <div className="character-list">
                {error ? <div>Erro</div> :
                    data?.map(item => (
                        <CharacterItem
                            key={item.id}
                            props={item}
                            clickCharacter={clickCharacter}
                        />
                    ))
                }
            </div>
        </section>
    )
}