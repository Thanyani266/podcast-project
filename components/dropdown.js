export const drpDown = () => {  
    let mylist = document.getElementById("myList"); 
}

const urrl = `https://podcast-api.netlify.app/id/${podcast.id}`;
export const disply = () => {
    fetch(urrl).then((response) => {
        return response.json()
    }).then((data) => {
        //here we save the item in the sessionStorage.
        sessionStorage.setItem("podData", JSON.stringify(data));


        //now we retrieve the object again, but in a string form.
        var podDataString = sessionStorage.getItem("podData");

        //to get the object we have to parse it.
        var podData = JSON.parse(podDataString);
        console.log(podData);
    })
}

drpDown();
disply();