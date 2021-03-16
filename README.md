# Display top 100 Albums Using React Framework

This web application can support several functionalities including:

1. Display the top 100 Albums in a Card List
2. Click Card to expand it for detail information (including adding items in Cart)
3. Users can fuzzy search for items based on Album's name or Artist's name
4. Users can use Filters to filter the results they want
5. Users can sort the items by price or by year
6. Users can't add items to Cart without LogIn
7. Users can add items to Cart after login, and edit the Item's info in the Cart page
8. Navigation Bar can change based on whether the user has logged in or not
9. Local Storage is available for saving user's token
10. CSS animation is available for both Card display and Card expand

## Admin User
username: admin  
password: 123456  
Just for showing some features related to LogIn

## Library Used:

1. Ant Design Library for Forms, Icons
2. react-router-dom for Page navigation
3. express and cors for local server setup

## API
1. Apple Music
2. Fetch

## Deployment
The project is deployed using AWS Amplify.  
  
The URL is https://branch.d788jigyv5jog.amplifyapp.com/  


## Token Usage
The server file is in **src/componment/auth** folder. To run it, just use **"node server.js"** command.  
Once the server is running, users don't need to relogin the next time when they visit the website if they didn't logout.

