import axios from 'axios';
import { createContext, useState, useEffect } from "react";
import {options} from '../utils/constants.jsx';

// context yapısının temelini oluşturma
export	const YoutubeContext = createContext();

// context'te tutulan verileri bütün uygulamaya paylaşma
export const ContextProvider = ({children}) => {
	const [selectedCategory, setSelectedCategory] = useState('New');
	const [searchResult, setSearchResult] = useState (null);

	// selectedCategory state'inin değişimini izleme
	useEffect(() => {
		//her kategori değiştiğinde null değeri verilsin bu sayede yükleniyor iconu ekleyebiliriz
		setSearchResult(null);
		// video verisini çek
		fetchCategory(selectedCategory);
	}, [selectedCategory]);

	// youtubedan verileri çekmeye yarayan fonksiyon
	 const fetchCategory = (category) => { axios.get(`https://youtube138.p.rapidapi.com/search/?q=${category}`,options)
	 .then((res) => setSearchResult(res.data.contents));
	};
	return(
		<YoutubeContext.Provider value={{selectedCategory, setSelectedCategory, searchResult }}>
			{children}
		</YoutubeContext.Provider> 
	);
} ;
