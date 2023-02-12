# first_pet `Keps'ko site`

Link to course-work about the internship: https://drive.google.com/file/d/1dNQmQY97-azema0hALnX--UmrC6OiFNP/view?usp=sharing
Here: I should type a description of this site and guide of this site
...

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
17. Deploy to vercel add keys, cos vercel doesn't see that
