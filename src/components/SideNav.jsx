import { useContext } from 'react'
import { categories } from '../utils/constants'
import { YoutubeContext } from '../context/youtubeContext'

const SideNav = () => {
	// contexte abone olma
	const{selectedCategory, setSelectedCategory} = useContext(YoutubeContext);

  return (
	<nav className='flex flex-col pt-4'>
		{categories.map((item) => (
		<>
		 {/* seçilen kategoriyi contexte gönderme */}
		<div onClick={() => setSelectedCategory(item.name)} className={`${selectedCategory === item.name && 'bg-red-800'} flex items-center gap-2 p-2 py-4 text-lg cursor-pointer hover:bg-slate-500`}>
			{item.icon}
			<span>{item.name}</span>
		</div>
		{/* Eğerki objenin divider değeri true ise ekrana bir çizgi bas*/}
		{item.divider && <hr/>}
		</>
	))}
	</nav>
  );
};

export default SideNav;