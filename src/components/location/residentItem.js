import { useEffect, useState } from 'react';
import './residentItem.scss';

export default function LocationResidentItem({clickCharacter, url}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(json => {
                setIsLoaded(true);
                setData(json)
            })
    }, []);

    return (
        <div className="location-resident-item" onClick={() => clickCharacter(data.id)}>
            {!isLoaded && <div>Carregando...</div>}
            {error ? <div>Erro</div> :
            <>
            <img src={data.image} alt={data.name}/>            
                <span>{data.name}</span>
            </>
            }
        </div>
    )
}


