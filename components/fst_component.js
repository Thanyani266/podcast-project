const sec = document.querySelector('#podcast');
const list = document.createDocumentFragment();
const url = 'https://podcast-api.netlify.app/shows';

const allData = () =>{
fetch(url)
.then((response) => {
    return response.json();
})
    .then((data) => {
      let podcast = data;

      podcast.map(function(podcast) {
        //let cn = document.querySelector("card");

        //cn.innerHTML = `<h3>${podcast.title}</h3>
           //             <img src=${podcast.image} alt="">
             //           <button>Seasons: ${podcast.seasons}</button>
              //          <p>${podcast.description}</p>
                //        <span>Genres: ${podcast.genres} | | Updated: ${podcast.updated}</span>`;
    

          let li = document.createElement('div');
          let name = document.createElement('h3');
          let pic = document.createElement('img');
          let btn = document.createElement('h6')
          let desc = document.createElement('p');
          let gen = document.createElement('span');

          const urt = `https://podcast-api.netlify.app/id/${podcast.id}`;
          fetch(urt)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            let podData = data;
            console.log(podData)
            let i = 0;
            let seasonTitle;
            let data2 = podData["seasons"];
            
            let text = "";
            for (let i = 0; i < data2.length; i++) {
              text += data2[i]["title"] + '</br>';
            }
            //for (let i in data2) {
              btn.innerHTML = `
                <div class="dropdown">
                  
                    <button data-preview-button="${podcast.id}">Seasons: ${podcast.seasons}</button>
                    <li class="drop">
                      <a href="#">${text}</a>
                    </li>
                </div>`;
            
         });

         //const results = podcast.update.forEach(date => new Date(date));
         
         
          name.innerHTML = `${podcast.title}`;
          pic.src = `${podcast.image}`;
          
          desc.innerHTML = `${podcast.description}`;
          gen.innerHTML = `Genres: ${podcast.genres} || Updated: ${podcast.updated}`;
          //upd.type = "date";
          //upd.innerHTML = `Updated: ${podcast.updated}`;

          li.appendChild(name);
          li.appendChild(pic);
          li.appendChild(btn);
          li.appendChild(desc);
          li.appendChild(gen);
          //li.appendChild(upd);
          list.appendChild(li);
          sec.appendChild(list);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
};

const disp = () => {
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        //here we save the item in the sessionStorage.
        sessionStorage.setItem("podcastData", JSON.stringify(data));


        //now we retrieve the object again, but in a string form.
        var podcastDataString = sessionStorage.getItem("podcastData");

        //to get the object we have to parse it.
        var podcastData = JSON.parse(podcastDataString);
        console.log(podcastData);
        
    })
}

const SingleShow = async (id) => {
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
  if(!response.ok){
    sec.innerHTML = `...`
    return
  }
  const data = await response.json()
  
  let seasonList = ''
  for(const { season, title, episodes } of data.seasons){
      seasonList = `${seasonList}
      <li class="ul2" id="test">
       <div class="card">
          <div class="image">
            <img src="${data.image}" width="100px" height="100px">
          </div>
          <div class="title">
            <h5>${title}</h5>
          </div>
          <button type="button" class="bty">Season ${season} episodes...</button>
        </div>       
      </li>`
     
  }
  sec.innerHTML = `<button data-action='back'>BACK</button>
  <h2>${data.title}</h2>
  <ul class="ul1">${seasonList}</ul>
  `                
  }

  const ShowEps = async () => {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
    if(!response.ok){
      sec.innerHTML = `...`
      return
    }
    const data = await response.json()
    
    let seasonList = ''
    for(const { season, title, episodes } of data.seasons){
        seasonList = `${seasonList}
        <li class="ul2" id="test">
         <div class="card">
            <div class="image">
              <img src="${data.image}" width="100px" height="100px">
            </div>
            <div class="title">
              <h5>${title}</h5>
            </div>
            <button type="button" class="bty" data-action="num">Play...</button>
          </div>       
        </li>`
       
    }
  
  sec.innerHTML = `<button data-action='back'>BACK</button>
                   <h2>${data.title}</h2>
                   <ul class="ul1">${seasonList}</ul>
                   `                
}

document.body.addEventListener('click', (event) => {
  const { previewButton, action, review } = event.target.dataset
  if(action && action === 'back'){
    allData()
    void(SingleShow(previewButton))
    return 
  }
  console.log(previewButton)

  if(!previewButton) return
  
  sec.innerHTML = `Loading ${previewButton}...`
  SingleShow(previewButton)
})


disp();
allData();