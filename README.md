# Spot The Cat

Spot The Cat is quizzical website that tests one's ability to pick out the difference between jaguars, cheetahs, and leopards.

The API being built for this application will store and deliver questions and scores. The prototype so far can deliver a random set of images per question as well as save a user's score once they complete the quiz. At the end of the quiz the user can choose to view their own score as well as a list of all other user's scores. Users can also create their own question set which is then saved onto the server so that it can be played by others. Scores are saved per user per quiz.

As far as the client is concerned, all of the necessary pages exist with stylesheets attached, but they haven't all been dressed up to look nice.

Going forward, I'm mostly gonna focus on the look of the website as a lot of it is mostly unstyles HTML. I'll also go through and refactor some code to (hopefully) make it more readable and in doing so add some clarification comments where I think its necessary.

To start to go above and beyond, I've included the [Cat Facts API](https://catfact.ninja/) which gives cat-related facts with every quiz question. I'm still thinking of more meaningful ways to add to my project beyond what I've already presented.

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
