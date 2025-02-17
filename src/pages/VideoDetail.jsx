import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '../utils/constants';
import ReactPlayer from 'react-player';
import loading from "../assets/loading.gif";
import { AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import millify from 'millify';
import VideoCard from '../components/VideoCard';
import StringArea from '../components/StringArea';

const VideoDetail = () => {
	const params = useParams();
	const [details, setDetails] = useState(null);
	const [relatedContent, setRelatedContent] = useState(null);

	useEffect(() => {
		// Kullanıcı alakalı videolardan birine tıklarsa
		// loading gösterebilmek için null'a çektik
		setDetails(null);
		setRelatedContent(null);
		// videonun id'sine göre detaylarının biligisini çek
		axios.get(`https://youtube138.p.rapidapi.com/video/details/?id=${params.videoId}`, options)
		.then((res) => setDetails(res.data));
	
		// benzer videoları çekme 
		axios.get(`https://youtube138.p.rapidapi.com/video/related-contents/?id=${params.videoId}`, options)
		 .then((res) => setRelatedContent(res.data.contents));
		// ! bağımlılık olarak useParamstan gelen videonun id'sini ekledik
		// ! alakalı videolardan birine tıklanırsa onun verisini çekmek istiyoruz.
	},[params.videoId]);
	
  return (
	<div>
		{/* details değeri null iken ekrana loading basma*/}
	{!details && (<img className='m-auto mt-[300px]' src={loading} />)}
	
		{details && (
			<div className='flex flex-col lg:flex-row lg:justify-between justify-center gap-5 p-3 sm:p-5 md:p-12'>
				{/* Ana içerik */}
			<div className='flex flex-col items-center lg:max-w-[900px]'>
				<ReactPlayer width={'100%'}  url={`https://www.youtube.com/watch?v=${details.videoId}`} controls playing={true}/>

				<div className='flex flex-col gap-5 mt-5'>
				<h2>{details?.title}</h2>
				<div className='flex justify-between'>
				{/* kanal hakkında bilgiler */}
				<div className='flex gap-4 items-center'>
					<img className='w-[48px] h-[48px] rounded-full' src={details?.author?.avatar[0]?.url} />
					<div>
						<p>{details.author.title}</p>
						<p>{details.author.stats.subscribersText}</p>
					</div>
					<button className='bg-white text-black rounded-lg p-1'>Abone Ol</button>
				</div>
				{/*Video hakkında bilgiler*/}
				<div className='flex gap-5'>
				<div className='flex items-center gap-3 bg-gray-800 rounded p-3 cursor-pointer hover:bg-gray-700'>
				<AiFillLike />
				<span>{millify(details.stats.likes)}</span>
				</div>
				<div className='flex items-center gap-3 bg-gray-800 rounded p-3 cursor-pointer hover:bg-gray-700'>
				<RiShareForwardLine />
				<span>Paylaş</span>
				</div>
				</div>
				</div>
				{/*video hakkında kısmı*/}
				<div className='bg-gray-600 rounded p-4'>
					<p className='flex gap-5 mb-3'>
						<span>{millify(details.stats.view)} kez izlendi</span>
						<span>{details.publishedDate} tarihinde yayınlandı</span>
					</p>
					<StringArea text={details.description} max={200} />
				</div>
				</div>
			</div>
			{/* Alakalı içerikler */}
			<div className='flex flex-col gap-3 lg:max-x-[300px] related'>
				{!relatedContent && <p>Loading...</p>}
				{relatedContent && relatedContent.map((video, i)=>{
					if (video.type !== "video") return;
					return <VideoCard key={i} videoInfo={video} />;
				})}
			</div>
			</div>
		)}
	</div>
  );
};

export default VideoDetail;