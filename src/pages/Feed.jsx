import { useContext } from "react";
import SideNav from "../components/SideNav";
import { YoutubeContext } from "../context/youtubeContext";
import VideoCard from "../components/VideoCard";

const Feed = () => {
	const { searchResult } = useContext(YoutubeContext);
  return (
	<div className="flex">
		<SideNav />
		<div className="videos">
			{!searchResult ? (
				<p>Loading...</p>
			) : (
				searchResult.map((video) => {
				// eğerki elemanın tipi video değilse hiçbirşey yapma
				if (video.type !== 'video') return;	
				// elemanın tipi video ise ekrana bir tane video kartı bas
				return <VideoCard videoInfo={video} />;
			})
		)}
		</div>
	</div>
  );
};

export default Feed;