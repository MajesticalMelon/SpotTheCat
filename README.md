# Spot The Cat

Spot The Cat is quizzical website that tests one's ability to pick out the difference between jaguars, cheetahs, and leopards.

The API being built for this application will store and deliver questions and scores. The prototype so far can deliver a random set of images per question as well as save a user's score once the complete the quiz. At the end of the quiz the user can choose to view their own score as well as a list of all other user's scores.

As far as the client is concerned, all of the necessary pages exist with stylesheets attached, but they haven't all been dressed up to look nice.

In the future, I'd like to allow users to create their own quizzes which can then be played separate from the default quiz. I also want to store user scores for each of these quizzes.
Obviously, I need to make the client look nice and presentable as well as show some sort of loading indicator whilst data is being fetched.

To go above and beyond, I've included the [Cat Facts API](https://catfact.ninja/) which gives cat-related facts with every quiz question. I'm still thinking of more meaningful ways to add to my project beyond what I've already presented.

The ParseBody and LoadFile functions have been borrowed from the homework assignments and are used to help with posting data and loading media files respectively. Both can be found in src/helpers.js.

## Endpoints

URL: /question
Supported Methods: GET, HEAD
Description: Randomly selects a question from the internal list of questions without replacement
Return Type: JSON

URL: /score
Supported Methods: GET, HEAD, POST
Description: Can GET all scores, GET a specific user's score, or POST/PATCH a user's score
Query Parameters: name (the name of the user who's score you're looking for)
Body Parameters: name & score (the name of the user as well as their score)
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
