import React, { Component } from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box';

export class AppClass extends Component {
	constructor() {
		super();

		this.state = {
			text: 'Hello'
		};
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<p>{this.state.text}</p>
					<button
						onClick={() => {
							this.setState({ text: 'Bye' });
						}}
					>
						Change Text
					</button>
				</header>
			</div>
		);
	}
}

function App() {
	const [ monsters, setMonsters ] = React.useState([]);
	const [ searchField, setSearchField ] = React.useState('');

	// https://jsonplaceholder.typicode.com/users
	React.useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((res) => res.json())
			.then((users) => setMonsters(users));
	}, []); // componentDidMount

	if (!monsters) {
		return <div>Loading...</div>;
	}

	const filteredMonsters =
		searchField === ''
			? monsters
			: monsters.filter((m) => m.name.toLowerCase().includes(searchField.toLowerCase()));

	const handleChange = (e) => {
		setSearchField(e.target.value);
	};

	return (
		<div className="App">
			<h1>Monsters Rolodex</h1>
			<SearchBox handleChange={handleChange} placeholder="search monsters" />
			<CardList monsters={filteredMonsters} />
		</div>
	);
}

export default App;
