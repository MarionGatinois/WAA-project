# WAA-project

# Deployement 
I choose to deploy on Heroku : 
here is the link to my app : https://projectwaa.herokuapp.com/
You can then choose the assignement that you want 

# 1Assignement : (5pts)
I choose to use my own multiuser whiteboard. (own function display, retrieved figures and drawing,..)
You can draw but also display figures and see those of others.

I add a connection function to register the drawer and to know who is the last drawer.

I add a button in the menubar to open image in a new tab AND to display it in a new image tag below the live canvas to save as.

Anti-Bug
- if you don't enter a name : alert -> you are not connected (user can't draw)
- if name to small : alert -> you are not connected (user can't draw)
- if options (size, thickness) of figures are empty : options are filled with default values


# 2Assignement : (10pts)
I choose to use my own multiuser whiteboard. (own function display, retrieved figures and drawing,..)
You can draw but also display figures and see those of others.

I add a 3 buttons : - one to save the image on the server - one to display all images saved on the server - one to open the image in a new tab 

- To save on the server I use MongoDb and to deploy on Heroku, I create an URL with password that is hidden (only on heroku) to connect to Mongo Atlas. On Mongo Atlas I create a new database and a collection to store all images (name, date, url)

- To display all images from MongoDb I use the same URL, I recover all images on Mongo Atlas with fetch


Anti-Bug
- same at exo1
- you can't draw if you are not connected but you can access to 'saved images' (display all images saved on mongoDB)
- you can't draw if you are not connected but you also can't saved your image on server



# 3Assignement : (10pts)
I choose the movie : Superman/Batman: Apocalypse

You can test the app with : 
- the director : Lauren Montgomery / 2 films : wonder woman / hulk vs. thor
- an actor : Michael Uslan / 3 films : the lego movie / joker / chase me

Anti-Bug
- if the movie enter is the same as the movie of the beginning (Superman/Batman: Apocalypse) : alert -> can't choose this one
- if a movie is enter twice : wrong answer (title already enter)
- case insensitive for name of actors/director/movies
- if input empty = alert -> enter un name/film
