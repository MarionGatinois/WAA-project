
let socket = io();
//socket.emit('drawing','coucou')

socket.on('drawing', function(message) {
  console.log("recu",message);
  retrievedObject(message)
})

var figures = [];
var position = [];
position.push({"nb" : 150, "nb2": 150});

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


const displayfunction = (form) => {
  var j=0;
  var test=0;
  while(j<2)
  {
    if (form==undefined)
    {
    var form =	document.getElementById("form").value;
    }
    const name=	document.getElementById("name").value;
    const bg_color=	document.getElementById("bgColor").value;
    const borderColor=	document.getElementById("borderColor").value;
    const thickness=	document.getElementById("thickness").value;
    const size=	document.getElementById("size").value;


    // getting a reference to our HTML element
    const canvas = document.querySelector('canvas')
    // initiating 2D context on it
    const c = canvas.getContext('2d')

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

    if(count == 0 && name!="")
    {
      j=3

      const message = {
      form: form,
      name:name,
      bg_color: bg_color,
      borderColor : borderColor,
      thickness : thickness,
      size : size,
      nb : nb,
      nb2 : nb2
      };

      if(form =='circle')
      {
        displayCircle(thickness, bg_color,borderColor, nb,nb2, size, c)
        c.fillText(name,5,(canvas.height-5))
        socket.emit("drawing", JSON.stringify(message))

      }
      if(form =='square')
      {
        displaySquare(thickness, bg_color,borderColor, nb,nb2, size, c)
        c.fillText(name,5,(canvas.height-5))
        socket.emit("drawing", JSON.stringify(message))


      }
      if(form =='triangle')
      {
        displayTriangle(thickness, bg_color,borderColor, nb,nb2, size, c)
        c.fillText(name,5,(canvas.height-5))
        socket.emit("drawing", JSON.stringify(message))
      }
      //TD8
    }
    else
    {
      position.pop();
      test = test+1;
      if(test==5 && name=="")
      {
        console.log('Entrez un nom')
        alert('Entrez un nom')
        j=3;
      }
      else if(test==5 && name!='')
      {
        console.log('Pas de place pour cette forme.. réessayez!')
        alert('Pas de place pour cette forme.. réessayez!')
        j=3;
      }
    }
  }
}




//display 10 forms

const randomdisplay = () => {
  for (var i=0; i<10;i++)
  {
    console.log(i)
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


const retrievedObject = async(message) => {

    const elem = JSON.parse(message);
    console.log(elem)

      if(elem !=null)
      {
      console.log(elem.form)
      if(elem.form != 'dessin')
      {
        const form = elem.form;
        const bg_color = elem.bg_color;
        const borderColor = elem.borderColor;
        const thickness = elem.thickness;
        const size = elem.size;
        const nb = elem.nb;
        const nb2 = elem.nb2;
        const name2 = elem.name;

        const canvas = document.querySelector('canvas')
        const c = canvas.getContext('2d')

        addEventListener('resize', () => {
          canvas.width = innerWidth
          canvas.height = innerHeight
        })

        console.log(form)

        if(form =='circle')
        {
          displayCircle(thickness, bg_color,borderColor, nb,nb2, size, c)
        }
        if(form =='square')
        {
          displaySquare(thickness, bg_color,borderColor, nb,nb2, size, c)
        }
        if(form =='triangle')
        {
          displayTriangle(thickness, bg_color,borderColor, nb,nb2, size, c)
        }
      }
      else{

        const x1 = elem.x1;
        const x2 = elem.x2;
        const y1 = elem.y1;
        const y2 = elem.y2;

        drawLine(x1, x2, y1, y2)
      }
  }
}

const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')


let isDrawing = false;
let x=0;
let y=0;

addEventListener('load', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})



function drawLine(x1, y1, x2, y2) {
  // using a line between actual point and the last one solves the problem
  // if you make very fast circles, you will see polygons.
  // we could make arcs instead of lines to smooth the angles and solve the problem
  const name=	document.getElementById("name").value;
  if(name=="")
  {
    alert('Entrez un nom')
  }
  else{
    const pencilSize=	document.getElementById("pencilSize").value;
    const pencilColor=	document.getElementById("pencilColor").value;
    c.beginPath();
    c.strokeStyle = pencilColor;
    c.lineWidth = pencilSize;
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.closePath();
    c.fillText(name,5,(canvas.height-5))
    const message = {
    form: 'dessin',
    c:c,
    x1: x1,
    x2: x2,
    y1 : y1,
    y2 : y2,
    };
    socket.emit("drawing", JSON.stringify(message))
  }
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
    drawLine(x, y, e.offsetX, e.offsetY);
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


const image = () => {
  var canvas = document.getElementById('canvas');
  var dataURL = canvas.toDataURL(image.png);
  console.log(dataURL)
  debugBase64(dataURL)
  document.getElementById('imageAfficher').innerHTML="<p>Image</p><img src='"+dataURL+"'>";
}

function debugBase64(dataURL){
    var win = window.open();
    win.document.write('<iframe src="' + dataURL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');

}