# Spot the Cat

## Description

**Spot the Cat** is a quizzical application that tests one's ability to differentiate between leopard, jaguar and cheetah. It also allows other users to create their own quizzes!

### API

The backend API for **Spot the Cat** stores questions and scores. When a user creates a quiz, the questions, as well as the answers, are stored so that they can be retrieved later. There is also a default quiz made by me that is always present in the application. Scores are handled in a similar way. When a user completes any quiz, the username they provided, as well as the score they got out of 10, is stored so that it can later be shown in the leaderboard.

As for data that gets delivered, we've already discussed how quiz questions and scores are gotten from the API. But, images, quiz names, scripts, HTML pages, and stylesheets are also retrieved from the backend. These data at these endpoints cannot be modified in any way as they are static files.

### Post Mortem

Early on, I had my girlfriend help me brainstorm ideas. From there we were able to bounce ideas back and forth and eventually we came to the concept for 'Spot the Cat' which I was able to build up into the website that I have now. Having this strong foundation for an idea really helped me stay focused. It wasn't so narrow of an idea that I couldn't expand on it and it wasn't so broad that there would too much to do to achieve a viable product.

I started having a good amount of CSS issues once I started adding styles to my pages. It's something I hadn't worked with in a while and so it was a little difficult to get the hang of again. Also, that lack of static typing that comes from something like TypeScript sometimes made it difficult to know if I was using the wrong name for a key or if the data really wasn't there and it would mess up the intellisense. All in all, there weren't many major issues or app-breaking bugs.

In the future, I'd like to be able to modify my question retrieval API to aloow me to choose certain questions or maybe even retrieve all of them at once. At the moment, fetching questions will get you a random question withuot replacement which can make it hard to customize the order of questions. I would also like to expand how quizzes are made and have variable amounts of images and quiz lengths. Right now, it is hardcoded at ten questions for a quiz and 3 images per question. One last major thing I would do is switch to using a framework like NextJS with TypeScript. I've worked with both a little before and it can take a lot of the headache out of making endpoints and scripts in JavaScript.

### Above and Beyond

In terms of external APIs, I have used only one and that is the ![Cat Facts API](https://catfact.ninja/). Right now, along with every question, a random cat fact will show up. There are ways to sort these by breed, but unfortunately I couldn't find jaguar, cheetah, and leopard in its list of breed tags. So, I just went with displaying a random cat fact retrieved from the API.

### Borrowed Code

The ParseBody and LoadFile functions have been borrowed from the homework assignments and are used to help with posting data and loading media files respectively. Both can be found in src/helpers.js.

## Endpoints

URL: /question
Supported Methods: GET, HEAD, POST
Description: Randomly selects a question from the internal list of questions without replacement
Query Parameters: quiz (the name of the quiz to get a question from)
Body Paramaters: quiz & questions (the name of the quiz as well as the list of questions associated with it)
Return Type: JSON

URL: /score
Supported Methods: GET, HEAD, POST
Description: Can GET all scores, GET a specific user's score, or POST/PATCH a user's score
Query Parameters: quiz & name (the quiz and the name of the user who's score you're looking for in that quiz)
Body Parameters: quiz, name, & score (the name of the user, their score, and the quiz the score is attached to)
Return Type: JSON

URL: /quizzes
Supported Methods: GET, HEAD
Description: Gets a list of all the quiz names including an empty name ('') for the default quiz
Return Type: JSON

URL: /images/{path}
Supported Methods: GET
Description: Can GET the image at client/images/{path}
Return Type: Image

URL: /scripts/{path}
Supported Methods: GET
Description: Can GET the .js file at client/scripts/{path}
Return Type: JS

URL: /styles/{path}
Supported Methods: GET
Description: Can GET the .css file at client/styles/{path}
Return Type: CSS

URL: /
Supported Methods: GET
Description: Gets client/index.html
Return Type: HTML

URL: /rules
Supported Methods: GET
Description: Gets client/rules.html
Return Type: HTML

URL: /quiz
Supported Methods: GET
Description: Gets client/quiz.html
Return Type: HTML

URL: /results
Supported Methods: GET
Description: Gets client/results.html
Return Type: HTML

URL: /create
Supported Methods: GET
Description: Gets client/create.html
Return Type: HTML

URL: /favicon.ico
Supported Methods: GET
Description: Gets client/favicon.ico
Return Type: x-icon (ico file)
