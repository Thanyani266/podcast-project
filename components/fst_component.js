const sec = document.getElementById('podcast');
const list = document.createDocumentFragment();
const url = 'https://podcast-api.netlify.app/shows';

export const allData = () =>{
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

          const urt = 'https://podcast-api.netlify.app/id/10716';
          fetch(urt)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            let podData = data;

          btn.innerHTML = `<form>
          <select id = "myList" onchange = "disply()" >
          <option>Seasons: ${podcast.seasons}</option>
          </form>`;
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

export const disp = () => {
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
disp();
allData();