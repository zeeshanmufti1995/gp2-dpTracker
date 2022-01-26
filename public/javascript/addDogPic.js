async function addDogPic(event) {
    event.preventDefault();

    const dogBreed = document.querySelector('#dogBreed').innerHTML;

    var apiCall = "https://dog.ceo/api/breed/" + dogBreed +"/images/random"
    
    await fetch(apiCall).then(function (response) {
        if(response.ok) {
            response.json().then(function(data) {
                showTheDog(data);
            });
        } else {
            alert('Unable to find a Dog Picutre');
        }
    })
    .catch(alert('API not working'));
}

function showTheDog(data) {
    console.log(data);
}

document.querySelector('#dogPic').addEventListener('click', addDogPic);