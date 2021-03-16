/*
Create a movie quizz static web application using the tmdb api

Choose a movie to start with on tmdb. the app will always start from this movie, user cannot change it.
On top of the page display a div containing movie info : title , image and release date of the movie
Below the movie info div, display a div containing a form
In this form Ask the user to give the director or one of the actors of the movie in an input text field with a submit button.
the user must enter full name, the search will be case insensitive
If the answer is wrong display a message in red near the submit button
If the answer is good, add a new div below the form div with the actor or director info : name, photo
Below this div display a div containing a form
In this form, Ask the user to give the name of a movie where this person was actor or director.
the user must enter full name, the search will be case insensitive
If the answer is wrong display a message in red near the submit button
If the answer is good, add a new div below the form div with the movie info : title, image and release date of the movie
GO TO 2.
Users must never enter the same movie name twice. if they do , don't accept the answer and display an adapted error message.
*/
//reponse : michael uslan / film :the lego movie/ joker/ chase me
//Lauren Montgomery / film : wonder woman /hulk vs. thor

const APIKEY ='3e6e959be28e78ae46890de57bfdd21a';
const ID= '45162';
const movie='Superman%20Batman%20Apocalypse'
const url_film = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${movie}`;
const url_image= 'https://image.tmdb.org/t/p/w500/';
const url_crew= `https://api.themoviedb.org/3/movie/${ID}/credits?api_key=${APIKEY}&language=en-US`;

function displayResults(json)
{
  var envoie ="";

  const result = json.results[0]
  envoie+="<a>"+"</br>"+"The movie is : " + result.title+"</br>" +'</a>';
  envoie+= "</br>"+"Published on "+ result.release_date +"</br>";
  envoie+="</br>"+`<img src='${url_image+result.poster_path}'></li>`+"</br>";

  document.getElementById("movie").innerHTML = envoie;
}


function getDirector(json) {
  infoDirector =[]
  const equipe = json.crew
  for (var i =0; i< equipe.length; i++)
  {
    if(equipe[i].job=='Director')
    {
      nameDirector=equipe[i].name.toLowerCase()
      photoDirector=`${url_image+equipe[i].profile_path}`
      id=equipe[i].id
      //console.log(nameDirector)
    }
  }
  infoDirector=[nameDirector, photoDirector, id]
  return infoDirector
}

function getActors(json) {
  infoActors =[]
  const equipe = json.crew
  var nameActor = [];
  var photoActor = [];
  var id = [];
  for (var i =0; i< equipe.length; i++)
  {
      nameActor[i]=(equipe[i].name.toLowerCase())
      photoActor[i]=(`${url_image+equipe[i].profile_path}`)
      id[i]=(equipe[i].id)
  }
  //console.log(nameActor)
  infoActors=[nameActor, photoActor,id]
  return infoActors
}

function getMovies(json) {
  const equipe = json.crew
  var film = [];
  var image =[];
  var date=[];
  //console.log(equipe)
  for (var i =0; i< equipe.length; i++)
  {
      film[i]=(equipe[i].title.toLowerCase())
      date[i]=(equipe[i].release_date)
      image[i]=(`${url_image+equipe[i].poster_path}`)
  }
  film=[film, image, date]
  return film
}


fetch(url_film).then(function(result) {
  return result.json();
}).then(function(json) {
  displayResults(json);
});

let infoDirector = null;
fetch(url_crew).then(function(result) {
  return result.json();
}).then(function(json) {
  infoDirector= getDirector(json);
});

let infoActors = null;
fetch(url_crew).then(function(result) {
  return result.json();
}).then(function(json) {
  infoActors= getActors(json);
});



function validateName(){
  reponse = document.getElementById("reponse");
  input = document.getElementById('name').value;
  var envoie='';
  count=0;
  if(input=='')
  {
    alert('please enter a name ')
  }

  nameDirector=infoDirector[0]
  photoDirector=infoDirector[1]
  nameActor=infoActors[0]
  photoActor=infoActors[1]

  for (var i =0; i< nameActor.length; i++)
  {
    if (input.toLowerCase()==nameActor[i])
    {
      count += 1;
      nameActorTrouvé=nameActor[i]
      photoActorTrouvé=photoActor[i]
    }
  }

  if(input.toLowerCase()==nameDirector.toLowerCase())
  {
    var rep = "<div><p>bonne réponse, voici la suite :</p><div>"
    suite = document.getElementsByClassName('suite');
    suite[0].style.display='block';
    reponse.style.color='green';

    envoie+="<a>"+"</br>"+"The director is : " + nameDirector +"</br>" +'</a>';
    envoie+="</br>"+`<img src=${photoDirector}></li>`+"</br>";

    document.getElementById("suite").innerHTML = envoie;
  }
  else if(count==1)
  {
    var rep = "<div><p>bonne réponse, voici la suite :</p><div>"
    suite = document.getElementsByClassName('suite');
    suite[0].style.display='block';
    reponse.style.color='green';

    envoie+="<a>"+"</br>"+"The actor is : " + nameActorTrouvé +"</br>" +'</a>';
    envoie+="</br>"+`<img src=${photoActorTrouvé}></li>`+"</br>";

    document.getElementById("suite1").innerHTML = envoie;
  }
  else
  {
    var rep = "<div><p>mauvaise réponse</p><div>";
    reponse.style.color='red';
    suite = document.getElementsByClassName('suite');
    suite[0].style.display='none';

  }
  document.getElementById("reponse").innerHTML = rep;
}

filmDouble=[]
var count2=0

async function validateFilm(){
  filmInput = document.getElementById('film').value.toLowerCase();
  acteurFilm = document.getElementById('name').value.toLowerCase();
  console.log(filmInput)
  double = ''
  filmDouble[count2]=filmInput
  count2+=1
  console.log(count2)



  if(filmInput=='')
  {
    alert('please enter a film ')
  }

  if(filmInput=='superman/batman: apocalypse')
  {
    alert('you can not enter the same film')
  }

  var k=0
  for (var i =0; i< filmDouble.length; i++)
  {
    console.log(filmDouble)
    if(filmInput==filmDouble[i])
    {
      k+=1
      if(k==2)
      {
        double = "<a>"+"</br>"+"The movie: " + filmInput +  " was already enter "+"</br>" +'</a>';
      }
    }
  }


  nameActor=infoActors[0]
  iDActor=infoActors[2]
  for (var i =0; i< nameActor.length; i++)
  {
    if (acteurFilm==nameActor[i])
    {
      iDtrouvé=iDActor[i]
      nameActorTrouvé=nameActor[i]
    }
  }

  const movies= await fetch(`https://api.themoviedb.org/3/person/${iDtrouvé}/movie_credits?api_key=${APIKEY}`).then(function(result) {
    return result.json();
  }).then(function(json) {
    return getMovies(json);
  });

  //console.log(infoMovies)
  count=0

  const infoMovies=movies[0];
  const image = movies[1];
  const date = movies[2];


  for (var i =0; i< infoMovies.length; i++)
  {
    if (filmInput==infoMovies[i])
    {
      count +=1
      imageFinal=image[i]
      dateFinal=date[i]
    }
  }
  if(count==1)
  {
    if(double == '')
    {
      var rep = "<div><p>bonne réponse:</p><div>"
      var final ="<a>"+"</br>"+"The movie is : " + filmInput +"</br>" +'</a>';
      final+= "</br>"+"Published on "+ dateFinal +"</br>";
      final+="</br>"+`<img src=${imageFinal}></li>`+"</br>";
      fin = document.getElementsByClassName('fin');
      fin[0].style.display='block';
      reponse2.style.color='green';
      document.getElementById("fin1").innerHTML = final;
    }
    else{
      var rep = "<div><p>mauvaise réponse</p><div>";
      rep+=double
      reponse2.style.color='red';
      fin = document.getElementsByClassName('fin');
      fin[0].style.display='none';
    }

  }
  else
  {
    var rep = "<div><p>mauvaise réponse</p><div>";
    rep+=double
    reponse2.style.color='red';
    fin = document.getElementsByClassName('fin');
    fin[0].style.display='none';
  }
  document.getElementById("reponse2").innerHTML = rep;
}

function finQuiz(){
  window.location.reload()
}
