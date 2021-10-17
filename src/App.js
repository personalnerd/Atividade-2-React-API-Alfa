import { useState } from 'react';
import CharacterList from './components/character/list';
import LocationList from './components/location/list';
import EpisodeList from './components/episode/list';
import Modal from './components/modal';
import logo from './logo.png'
import './App.scss';

function App() {
	const [modal, setModal] = useState({type: null, id: null, url: null, formValues: null})

	return (
		<div className="App">
			<header>
				<img src={logo} alt="Rick & Morty logo" />
			</header>
			<div className="row">
				<CharacterList setModal={setModal} />
				<LocationList setModal={setModal}/>
				<EpisodeList setModal={setModal} />
			</div>
			<Modal props={modal} setModal={setModal} />
		</div>
	);
}

export default App;
