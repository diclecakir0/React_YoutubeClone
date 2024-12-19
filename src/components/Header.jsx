import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const [query, setQuery] = useState('');
	

  return (
	<header className="flex justify-between items-center p-2 sticky">
		<Link to={'/'}>
		<div className="flex items-center ">
		<img className="w-[100px]" src="https://www.freepnglogos.com/uploads/youtube-play-button-png/youtube-play-button-file-youtube-play-buttom-icon-svg-wikimedia-commons-8.png"/>
		<h1 className="text-white text-2xl">YouTube</h1>
		</div>
		</Link>
		<form className="flex items-center bg-white rounded">
			<input className="px-4 py-1 rounded text-black outline-none" type="text" onChange={(e) => setQuery(e.target.value)}/>
			<Link to={`/results?search_query=${query}`} className="mr-2"><IoSearch className="text-black" />
			</Link>
		</form>
		<FaBell className="mr-4" />
	</header>
  );
};

export default Header;