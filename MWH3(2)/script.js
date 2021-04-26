const client_id = '8a8069db6f854d2299090ff37e96ba08';
const client_secret = 'cd56be9bdff44f548e38ad57fb946add';

let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }).then(onTokenResponse).then(onTokenJson);

  
  
function onTokenResponse(response)
{
  return response.json();
}

function onTokenJson(json)
{
  token = json.access_token;
  console.log(json);
  podcast()
}

function podcast() {
const podcast_value = 'Correre Per Sempre Podcast';

  fetch("https://api.spotify.com/v1/search?q="+podcast_value+"&type=episode&limit=10&offset=0&market=IT"  ,
        {
            headers:
            {
                'Authorization': 'Bearer ' + token,
                'Accept': "application/json"
            }
        }
        
    ).then(onResponse).then(onJson);

      }
  
function onResponse(response) {
console.log('Risposta ricevuta');
return response.json();
}


function onJson(json) {
  console.log(json);
  console.log('JSON ricevuto');
  const library = document.querySelector("#Podcast");
  const results = json.episodes.items;
  let num_results = results.length;
  if(num_results > 9)
    num_results = 9;
  for(let i=0; i<num_results; i++)
  {
    const podcast_data = results[i]
    const title = document.createElement('h1');
    title.textContent= podcast_data.name;
    const selected_image = podcast_data.images[0].url;
    const description = document.createElement('p');
    description.textContent= podcast_data.description;
    library.classList.add('album');
    const img = document.createElement('img');
    const button=document.createElement('a');
    button.href= podcast_data.external_urls.spotify;
    button.textContent= "Ascolta";
    button.target="_blank";
    const container = document.createElement('div');
    img.src = selected_image;
    container.appendChild(title);
    container.appendChild(img);
    container.appendChild(description);
    container.appendChild(button);
    library.appendChild(container);

  }
}






