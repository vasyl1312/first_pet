# pet `Keps'ko site`

Link to course-work about the internship: https://drive.google.com/file/d/1dNQmQY97-azema0hALnX--UmrC6OiFNP/view?usp=sharing

### This website is written on Node.js/Express/MongoDB/Google Auth/JS-frontend/REST API/SendinBlue - with CRUD operations and more.

On this website, you can sign in/up with email or googleAuth, and reset your forgotten password.
Users can add their own resume with information, cv, technologies, photos, expected salary, and more. Everyone can see all candidates, how they studied, where, and what to be in this position. Other people or companies can add good candidates to their favorite page and communicate with the owner by email(SendinBlue). And on the website are a history page of communication, a page of our own products, and pages with filtres by technologies. Also, all products have sharing page on social media this resume will be useful for applying to offers and the candidate won't send a cv in pdf-will send a complete cv with studying steps and pet projects.
On this website are more features, and about these, you can see below:

# This is a short description of each commit

`Simple registration`

1. Initialization (express, nodemon, connect to Mongo)
2. Simple routes
3. Some Html CSS things
4. Register with a mongoose connection
5. Add Schema, update Html register and home page
6. Login page, update routing from pages
7. Remove /.. .html from routes
8. Login logics
9. From Html to EJS
10. Check correct input name(>3) and password(>6)
11. Add bootstrap Html and update home/login/register page

`Work with DB and logic`

12. Create a model for the new product and add routes
13. Renaming
14. Show all products when adding new
15. Add style for all products and in home page link to my social media
16. Add an alert when we have a problem on the client side
17. Add btn to open product and style to this; price for the product
18. When URL is incorrect and works with the input price, the name has been shorter than 45 letters
19. Add max-width to the image on all pages; edit products
20. Add to favourite; output id products in the favourite
21. Show and attribute products in the favourite
22. Delete products from the favourite (resolve bugs)
23. Delete products from all list
24. Add msg when edit/delete/add product; update method - edit product
25. When adding a new product or adding to a favourite remember a user
26. Some updates to the favourite

`Session`

1. Add session, hide pages for non-auth users and show for auth
2. Save the session, delete our temporary user
3. Session in DB, hiding buttons 'edit' 'add to favourite' for non-authenticated user
4. Secure routes mean when a non-auth user tries to go on routes like favourite
5. Add middleware for the user, and logout routes move to the main routes
6. When the user is logged in, save the session

`Work with email`

7. Object configuration(create a file with constants)
8. Setting email service when a user does a registration(sendgrid=>have to register in SendGrid, verify email, answer the questions for what you want to use SendGrid, create API key, verify sending-email, connect for node)
9. Update mail, when the user does register on this site
10. Password recovery(on login page add button - forgot a password); add btn, check email in DB, generate a random key, send message to email for reset password
11. Add a page for a new password(add a route, when we have to reset the password)
12. Changing password(check user, token, hash new password)

`Updating website`

13. When a user adds a product, another user doesn't allow edit btn; secure delete
14. Error 404(when user input non-existing route)
15. Create profile page(routes, beauty, page)
16. Post to profile page, upload/change avatar photo
17. For the add-page, upload a photo
18. For edit-product, upload a new photo
19. Read product, settings image
20. Other favourites of each user
21. Add new branch
22. Some updating on the favourite page
23. Preparing to btn 'contact with this candidate'
24. Add logic to communications with a candidate
25. Add new branch
26. Add a history table of the communication page
27. Delete from history; and some styles for a table of communication

`Solving some bugs and adding new opportunities`

1. Non-owner of the product cannot edit this product; show msg
2. When the user changes/deletes a product/profile photo - delete an old img from DB
3. Checking, that the user can't add to favourite page own product/ doesn't allow adding product twice
4. Solving problems in a model by adding and removing product
5. Add to favourites(add id product), solving a problem with img when deleting the product
6. Delete from favourites, show favourites
7. Fix problem with add product or create a new user without img, replace empty image URL-path to path from folder
8. Add a bigger input form to the description, and style of this
9. Add auth0, user can login and signup with google
10. When users use to sign up by google - fixing the problem with double-click to btn sign up
11. Adding basic logic to sorting by categories
12. Complete logic to sorting by categories
13. Add a page for my products, and allow, that non auth user able to read a product
14. When owner delete product, delete id from all user's favourites
15. Moving duplicate html code to a separate folder
16. Moving duplicate routes read product to a separate middleware
17. Add dotenv to hide keys and deploy project but still not work
18. Push key to .env
19. Connect to sendinblue, fixing send email
20. Fixing deploying, and hiding the type of error in the login page for more security
21. All products-page show a mark on user's own products
22. Add date to product
23. Compare changes from update2 branch to main
24. When the user registers his account by google auth - generate a random password
25. Add sharing button for all products to social media
26. Add copy link button to each products

`Frontend fixing`

1. Simple bootstrap style to allproduct page
2. Add all styles and actions to Allprod Page
3. Styles to Single Product Page
4. Styles for all categories
5. Styles for myProducts Page
6. Add file, that to generate views for different devices
7. Fix Add new Page
8. History page
9. Favourite page
10. Update 'my product' mark and edit product page(without headers, and correct select category)
11. 404 page
12. Profile
13. Login page
14. Sign up
15. Reset password
16. Main page
17. Reset password
18. To all pages hide cosmos, add background

<!-- fix deploy -->
