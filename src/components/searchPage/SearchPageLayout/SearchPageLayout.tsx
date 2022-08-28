import { MainPageMenu } from '../../mainPage/MainPageMenu/MainPageMenu'
import MovieCardFlatList from '../MovieCardFlat/MovieCardFlat'
import "./SearchPageLayout.scss"
import { useEffect, useState } from 'react';
import { token } from '../../../utils/token';
import axios from 'axios';

export const SearchPageLayout = () => {
	const [results, setResults] = useState([]);

	const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
	const myParam: string | null = urlParams.get('search');
	console.log(myParam);

	useEffect(()=> {
		axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${myParam}&page=1`, {
			headers: {
				'X-API-KEY': token
			}
		}).then(({ data }) => !data.errors ? setResults(data.films) : setResults([]));
	},[results]);

	return (
		<main className="search-page">
			<MainPageMenu />
			<div className="search-page__content">
				<div className="search-page__content_header">
					<div className="search-page__content_header_search-word">Поиск: {myParam?.toUpperCase()}</div>
					<div className="search-page__content_header_total-results">Результаты: {results.length}</div>
				</div>
					<MovieCardFlatList movies={results} />
			</div>
		</main>
	)
}
