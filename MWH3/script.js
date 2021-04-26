function onJson(json)
{
	const library = document.querySelector('#risultati');
	library.innerHTML='';
	let num_results = json.num_found;
	console.log(json);
	
	
	if(num_results > 8)
			num_results = 8;
		
	
	for (let i = 0; i < num_results; i++)
	{
          
		const book = document.createElement('div');
		
        book.classList.add('book');

		const doc = json.docs[i];
		const title = doc.title;
		if (doc.isbn) {

			const isbn = doc.isbn[0];
	        const cover_url = 'http://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg';
			
		
				
		    const img = document.createElement('img');
		    img.src = cover_url;
			book.appendChild(img);
					
		
		    const caption = document.createElement('span');
		    caption.textContent = title;
		
		    book.appendChild(caption);
		
		    library.appendChild(book);

			
			

		}
	
	}
	
	
	
}

function onResponse(response)
{
	return response.json();
}

rest_url = 'http://openlibrary.org/search.json?title=Atletica';

	fetch(rest_url).then(onResponse).then(onJson);