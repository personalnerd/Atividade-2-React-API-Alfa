import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import LocationSearchItem from './locationItem';
import './search.scss'

export default function LocationSearch({ formValues, setModal }) {    
    const [info, setInfo] = useState(null)
    const [data, setData] = useState([]);
    const [next, setNext] = useState(null);

    const [values, setValues] = useState(formValues);
    const [loading, setLoading] = useState(false);
    
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
        fetch(`https://rickandmortyapi.com/api/location/?${queryString}`)
        .then(res => res.json())
        .then(json => {
            setData(json.results)
            setInfo(json.info)
            setNext(json.info.next)
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

    function clickLocation(url) {
        setModal({type: 'LocationInfo', url: url})
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
            <div className="modal-location-search-filter">
                <h1 className="modal-search-filter__title">Search for Locations</h1>
                <form className="modal-search-filter__form" onSubmit={(e) => handleSubmit(e, doSearch)}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" onChange={handleChange} value={values?.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input type="text" name="type" id="type" onChange={handleChange} value={values?.type} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dimension">Dimension</label>
                        <input type="text" name="dimension" id="dimension" onChange={handleChange} value={values?.dimension} />
                    </div>
                    <div className="form-group">
                        <button type="reset">Reset</button>
                    </div>
                    <div className="form-group">
                        <button type="submit">{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Go' }</button>
                    </div>
                </form>
            </div>
            <div className="modal-location-search-results">
                <h3>Results: <span>{info && `${info.count} items found`}</span></h3>
                
                <div className="modal-location-search-results__list">
                    {data && data?.map((location) => (
                        <LocationSearchItem key={location.id} url={location.url} clickLocation={clickLocation} />
                    ))}
                    {next && <div onClick={() => loadMore(next)} className="link load-more">{loading && <FontAwesomeIcon icon={faSpinner} spin />}Load more</div>}
                </div>
            </div>
        </>
    )
}