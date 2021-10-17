import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LocationItem from "./item";
import { useEffect, useState } from "react";

export default function LocationList({setModal}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    let arr = []
    while (arr.length < 3) {
        var r = Math.floor(Math.random() * 108) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/location/${arr}`)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json)
            })
    }, []);

    function handleClick(url) {
        setModal({type: 'LocationInfo', url: url})
    }

    function clickSearch() {
        setModal({type: 'LocationSearch'})
    }

    return (
        <section className="col">
            <h2>Locations <FontAwesomeIcon className="search-icon" icon={faSearch} onClick={() => clickSearch()} /></h2>
            {!isLoaded && <div>Carregando...</div>}
            <div className="location-list">
                {error ? <div>Erro</div> :
                    data?.map(item => (
                        <LocationItem
                            key={item.id}
                            location={item}
                            handleClick={handleClick}
                        />
                    ))
                }
            </div>
        </section>
    )
}