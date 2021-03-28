
let socket = io();
//socket.emit('drawing','coucou')

socket.on('drawing', function(message) {
  //console.log("recu",message);
  retrievedObject(message)
})

var figures = [];
var position = [];
position.push({"nb" : 150, "nb2": 150});

let name=""

//partie connexion :

function user(){
    let name2 = document.getElementById('name')
    let connexion = document.getElementById('connexion')
    if(name2.value.length >= 3){
        name = name2.value
        connexion.innerHTML = `You are connected : <b> Welcome ${name} !</b>`
    }
    else{
        connexion.innerHTML = `You are not register`
        name = ""
    }
    return(name)
}

//display figures


const displayCircle = (thickness, bg_color,borderColor, nb,nb2, size, c) => {
  c.lineWidth =  thickness
  c.beginPath()
  c.fillStyle= bg_color
  c.strokeStyle = borderColor
  c.arc(nb,nb2, size/2, 0, Math.PI * 2)
  c.fill();
  c.stroke();
}

const displayTriangle = (thickness, bg_color,borderColor, nb,nb2, size, c) => {
  var size3 = parseInt(nb,10) + parseInt(size,10)
  var size1 = parseInt(nb,10) + parseInt(size,10)/2
  var size2 = parseInt(nb2,10) + parseInt(size,10)/2
  c.lineWidth =  thickness
  c.beginPath()
  c.fillStyle= bg_color
  c.strokeStyle = borderColor
  c.moveTo(nb, nb2);
  c.lineTo(size3, nb2);
  c.lineTo(size1, size2);
  c.closePath();
  c.fill();
  c.stroke();

}

const displaySquare = (thickness, bg_color,borderColor, nb,nb2, size, c) => {
  c.lineWidth =  thickness
  c.beginPath()
  c.fillStyle= bg_color
  c.strokeStyle = borderColor
  c.rect(nb, nb2, size, size)
  c.fill();
  c.stroke();
}

const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')


//function appelé pour l'affichage des figures

const displayfunction = (form) => {
  nameuser = user()
  if(nameuser!="")
  {
  var j=0;
  var test=0;
  while(j<2)
  {
    if (form==undefined)
    {
    var form =	document.getElementById("form").value;
    }
    const bg_color=	document.getElementById("bgColor").value;
    const borderColor=	document.getElementById("borderColor").value;
    var thickness=	document.getElementById("thickness").value;
    var size=	document.getElementById("size").value;
    if(thickness=="")
    {
      thickness=2
    }
    if(size=="")
    {
      size=20
    }

    addEventListener('load', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight}
  )

    let nb = (Math.floor((Math.random()*(canvas.width-size))));
    let nb2 = (Math.floor((Math.random()*(canvas.height-size))));
    position.push({"nb" : nb, "nb2": nb2});
    var count = 0;


    for (i = 0; i < position.length-1; i++)
    {
        var position1 = position[i].nb;
        var position2 = position[i].nb2;
        var sizeInt = parseInt(size,10) + parseInt(thickness,10);
        var a = ((nb>(position1-(sizeInt))) && (nb<(position1+(sizeInt))));
        var b = ((nb2>(position2-(sizeInt))) && (nb2<(position2+(sizeInt))));

        if(b == true)
        {
          if(a == true)
          {
            count = count +1;
          }
        }
    }

    if(count == 0)
    {
      j=3

      const message = {
      form: form,
      name:nameuser,
      bg_color: bg_color,
      borderColor : borderColor,
      thickness : thickness,
      size : size,
      nb : nb,
      nb2 : nb2,
      name: nameuser
      };

      if(form =='circle')
      {
        displayCircle(thickness, bg_color,borderColor, nb,nb2, size, c)
        socket.emit("drawing", JSON.stringify(message))
        document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${nameuser} !</b>`

      }
      if(form =='square')
      {
        displaySquare(thickness, bg_color,borderColor, nb,nb2, size, c)
        socket.emit("drawing", JSON.stringify(message))
        document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${nameuser} !</b>`


      }
      if(form =='triangle')
      {
        displayTriangle(thickness, bg_color,borderColor, nb,nb2, size, c)
        socket.emit("drawing", JSON.stringify(message))
        document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${nameuser} !</b>`

      }
      //TD8
    }
    else
    {
      position.pop();
      test = test+1;
      if(test==5)
      {
        console.log('Pas de place pour cette forme.. réessayez!')
        alert('Pas de place pour cette forme.. réessayez!')
        j=3;
      }
    }
    }
  }
  else {
    alert('you are not connected')
  }
}




//display 10 forms

const randomdisplay = () => {
  for (var i=0; i<10;i++)
  {
    rd=(Math.floor((Math.random()*(3))));
      if(rd==0) //circle
      {
        displayfunction('circle');
      }

      if(rd==1) //square
      {
        displayfunction('square');
      }

      if(rd==2) //triangle
      {
        displayfunction('triangle');
      }
    }
}

//affichage des dessins dans socket.io//

const retrievedObject = async(message) => {

    const elem = JSON.parse(message);

      if(elem !=null)
      {
      if(elem.form != 'dessin')
      {
        const form = elem.form;
        const bg_color = elem.bg_color;
        const borderColor = elem.borderColor;
        const thickness = elem.thickness;
        const size = elem.size;
        const nb = elem.nb;
        const nb2 = elem.nb2;
        const username = elem.name;

        const canvas = document.querySelector('canvas')
        const c = canvas.getContext('2d')

        addEventListener('resize', () => {
          canvas.width = innerWidth
          canvas.height = innerHeight
        })


        if(form =='circle')
        {
          displayCircle(thickness, bg_color,borderColor, nb,nb2, size, c)
          document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${username} !</b>`
        }
        if(form =='square')
        {
          displaySquare(thickness, bg_color,borderColor, nb,nb2, size, c)
          document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${username} !</b>`
        }
        if(form =='triangle')
        {
          displayTriangle(thickness, bg_color,borderColor, nb,nb2, size, c)
          document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${username} !</b>`
        }
      }
      else{

        const x1 = elem.x1;
        const x2 = elem.x2;
        const y1 = elem.y1;
        const y2 = elem.y2;
        const username = elem.name;
        const pencilSize = elem.pencilSize;
        const pencilColor = elem.pencilColor;
        drawLineRetrieve(x1, y1, x2, y2, username, pencilSize, pencilColor)
        document.getElementById('lastUser').innerHTML = `Last drawer is  <b>  ${username} !</b>`

      }
  }
}



//dessin à la  main

let isDrawing = false;
let x=0;
let y=0;

addEventListener('load', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})



function drawLine(x1, y1, x2, y2, pencilSize, pencilColor) {
  // using a line between actual point and the last one solves the problem
  // if you make very fast circles, you will see polygons.
  // we could make arcs instead of lines to smooth the angles and solve the problem
  username=user()
  if(username=="")
  {
    alert('you are not connected')
  }
  else
  {
    if(pencilSize=="")
    {
      var pencilSize=	document.getElementById("pencilSize").value;
    }
    if(pencilColor=="")
    {
      const pencilColor=	document.getElementById("pencilColor").value;
    }
    c.beginPath();
    c.strokeStyle = pencilColor;
    c.lineWidth = pencilSize;
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.closePath();
  }
}

function drawLineRetrieve(x1, y1, x2, y2, username, pencilSize, pencilColor) {
  c.beginPath();
  c.strokeStyle = pencilColor;
  c.lineWidth = pencilSize;
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.stroke();
  c.closePath();
}

canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect()
    x = e.clientX - rect.left
    y = e.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    isDrawing=true

})

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    //drawCircleAtCursor(x,y,canvas, e)
    username = user()
    drawLine(x, y, e.offsetX, e.offsetY, username);
    const message = {form:'dessin', name: username ,x1: x, y1: y, x2: e.offsetX, y2: e.offsetY, pencilColor: document.getElementById('pencilColor').value, pencilSize: parseInt(document.getElementById('pencilSize').value)}
    socket.emit("drawing", JSON.stringify(message))
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    //drawCircleAtCursor(x,y,canvas, e)
    drawLine(x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})



//Exercice des images

function image  (dataURL) {
  console.log('fff'+dataURL)
  if(dataURL==undefined)
  {
    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL(image.png);
    //console.log(dataURL)
    var win = window.open();
    win.document.write('<img src="' + dataURL  + '"/>');
    console.log(dataURL)

    document.getElementById('imageAfficher').innerHTML="<p>Image</p><img src='"+dataURL+"'>";
    return dataURL;
  }
  else{
    var win = window.open();
    win.document.write('<img src="' + dataURL  + '"/>');
  }
}

const imageServer = () => {
  var canvas = document.getElementById('canvas');
  var dataURL = canvas.toDataURL(image.png);  username=user()
  if(username=="")
  {
    alert('you are not connected')
  }
  else
    {
    //console.log(username, dataURL, Date.now())
    const message = {
      username : username,
      datetime:  new Date().toLocaleString("fr-FR"),
      path_to_image :dataURL,
    }
    const fetchOptions = {
       method: 'POST',
       headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json'},
       body: JSON.stringify(message)
     };

     function onTextReady(text){
       console.log('text'+text);
     };

     function onResponse(res){
       console.log('res.text'+res);
       return res.text();
     };

     fetch('/pushFigure', fetchOptions).then(onResponse).then(onTextReady);
       alert('upload is done ! ')
   }
}

const imageLocal =() => {
  var canvas = document.getElementById('canvas');
  var dataURL = canvas.toDataURL(image.png);  username=user()
  if(username=="")
  {
    alert('you are not connected')
  }
  else
    {
    //console.log(username, dataURL, Date.now())
    const message = {
      username : username,
      path_to_image :dataURL,
    }
    const fetchOptions = {
       method: 'POST',
       headers: {'Accept' : 'application/json', 'Content-Type' : 'application/json'},
       body: JSON.stringify(message)
     };

     function onTextReady(text){
       console.log('text'+text);
     };

     function onResponse(res){
       console.log('res.text'+res);
       return res.text();
     };
     fetch('/upload', fetchOptions).then(onResponse).then(onTextReady);
     alert('upload is done ! ')

   }

}

const savedImage = () => {
  name=user()
  retrievedImage(name);
}


const retrievedImage = async(name) => {
  var elem = await queryImage(name);
  console.log(elem)
  var win = window.open();
  for (i in elem)
  {
    {
      if(elem[i]!=null)
      {
        //console.log(elem[i])
        win.document.write('<img width=200px border=solid black 10px  src="' + elem[i].path_to_image  + '"/>');
        win.document.write('<p>' + 'Draw by <b>'+ elem[i].username  + '</b> at the date: ' +elem[i].datetime  +'</p>');
        //win.document.write(`<p> Here the Link to the image :  <button id=${i} onClick="window.open('${elem[i].path_to_image}')">Click_Here</button></p>` );
      }
    }
  }
}

const queryImage = async(username) => {
  const doc = {username:username}
    return fetch(`/getFigure`,{body: JSON.stringify(doc) ,method: "POST", headers: {"Content-type": "application/json; charset=UTF-8"}}).then(function(result) {
        return result.json();
    }).then(function(json) {
        return(json.data)
    });
}
