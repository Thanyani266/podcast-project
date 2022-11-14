export const myFunction = () =>
        {
            document.onreadystatechange = function () {
                var state = document.readyState
                if (state == 'interactive') {
                     document.getElementById('podcast').style.visibility="hidden";
                } else if (state == 'complete') {
                    setTimeout(function(){
                       document.getElementById('interactive');
                       document.getElementById('preloader').style.visibility="hidden";
                       document.getElementById('podcast').style.visibility="visible";
                    },1000);
                }
              }
}

export const savedData = () =>{
    async function getSavedData() {
        const meetingData = await getData();
    }
    async function getData() {
        const preloadedData = sessionStorage.getItem('podcastData');
        if (!preloadedData) {
            try {
                const response = await fetch('https://podcast-api.netlify.app/shows');
                const data = validate(response.json());
                sessionStorage.setItem('podcastData', JSON.stringify(data));
                return data;
            } catch (e) {
                console.log('Whoa! Fetch error with getData()');
            }
        } else {
            return JSON.parse(preloadedData);
        }
    }
getSavedData();
getData();
}
myFunction();
//savedData();