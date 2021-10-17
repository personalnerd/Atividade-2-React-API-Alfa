import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import LocationResidentItem from '../location/residentItem';
import './search.scss'

export default function CharacterSearch({ formValues, setModal }) {    
    const [error, setError] = useState(false)
    const [info, setInfo] = useState(null)
    const [data, setData] = useState([]);
    const [next, setNext] = useState(null);

    const [values, setValues] = useState(formValues);
    const [loading, setLoading] = useState(false);
    
    const statusOptions = [
        {label:"", value:""},
        {label:'Alive', value:'alive'},
        {label:'Dead', value:'dead'},
        {label:'Unknown', value:'unknown'},
    ]
    const genderOptions = [
        {label:"", value:""},
        {label:'Female', value:'female'},
        {label:'Male', value:'male'},
        {label:'Genderless', value:'genderless'},
        {label:'Unknown', value:'unknown'},
    ]

    function handleChange(event) {
        const auxValues = { ...values };
        auxValues[event.target.name] = event.target.value;
        setValues(auxValues);
    };
 
    function handleSubmit(event, callback) {
        event.preventDefault();
        callback();
    }

    function doSearch() {
        setLoading(true);
        const queryString = objectToQueryString(values)
        fetch(`https://rickandmortyapi.com/api/character/?${queryString}`)
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                setError(json.error)
            } else {
                setData(json.results)
                setInfo(json.info)
                setNext(json.info.next)
                setError(false);
            }
            setLoading(false);
        })
    }
    
    function loadMore(url) {
        setLoading(true);
        fetch(url)
        .then(res => res.json())
        .then(json => {
            const updatedData = [...data, ...json.results]
            setData(updatedData)
            setInfo(json.info)
            setNext(json.info.next)
            setLoading(false);
        })
    }

    function clickCharacter(id) {
        setModal({type: 'CharacterInfo', id: id, url: null})
    }

    function objectToQueryString(obj) {
        var str = [];
        for (var p in obj)
          if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
        return str.join("&");
      }

    return (
        <>
            <div className="modal-search-filter">
                <h1 className="modal-search-filter__title">Search for Characters</h1>
                <form className="modal-search-filter__form" onSubmit={(e) => handleSubmit(e, doSearch)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={handleChange} value={values?.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select name="status" id="status" value={values?.status} onChange={handleChange}>
                            {statusOptions.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group" >
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" id="gender" value={values?.gender} onChange={handleChange}>
                            {genderOptions.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="species">Species</label>
                        <input type="text" name="species" id="species" onChange={handleChange} value={values?.species} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input type="text" name="type" id="type" onChange={handleChange} value={values?.type} />
                    </div>
                    <div className="form-group">
                        <button type="submit">{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Go' }</button>
                    </div>
                </form>
            </div>
            <div className="modal-search-results">
                <h3>Results: <span>{info && `${info.count} items found`}</span></h3>
                
                <div className="modal-search-results__list">
                    {error ? error :
                        data && data?.map((character) => (
                            <LocationResidentItem key={character.id} url={character.url} clickCharacter={clickCharacter} />
                        ))
                    }
                    {next && <div onClick={() => loadMore(next)} className="link load-more">{loading && <FontAwesomeIcon icon={faSpinner} spin />}Load more</div>}
                </div>
            </div>
        </>
    )
}