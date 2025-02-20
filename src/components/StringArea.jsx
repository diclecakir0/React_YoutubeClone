import React, { useState } from 'react';

const StringArea = ({text, max}) => {
	// kısa yazıyı mı  uzunu mu göstereceğimizin state'i
	const [showFullText, setShowFulltext] = useState(false);

	const handleClick = () => {
		setShowFulltext(!showFullText);
	}; 
	/*
	* eğerki bizim yazımızın uzunluğu 
	* max değerinden uzunsa yazının max'a kadar
	* olan kısmını al ve sonuna ... koy
	* değilse olduğu gibi kalsın
	*/
	
	let shortText = text;

	if(text.length > max && !showFullText) {
		shortText = text.substring(0, max) + '...';
	}

	// eğerki paragrafa tıklanırsa tam halini göster
  return <p onClick={handleClick}>{shortText}</p>;
};

export default StringArea;

// alternatif yöntem 

{/* <p>
{showFullText ? text : `${text.substring(0, 200)}...`}
<button onClick={() => setShowFulltext(!showFullText)}>
{showFullText ? 'show less' : 'read more'}
</button>
</p>; */}