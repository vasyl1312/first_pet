# first_pet `Keps'ko site`

Here: I should to type description about this site and author and guide of this site
...

# This is short description of each commit

`Simple registration`

1. Initialization (express, nodemon, connect to Mongo)
2. Simple routes
3. Some html css things
4. Register with mongoose connection
5. Add Schema, update html register and home page
6. Login page, update routing from pages
7. Remove /.. .html from routes
8. Login logics
9. From html to EJS
10. Check correct input name(>3) and password(>6)
11. Add bootstrap html and update home/login/register page

`Work with db and logics`

12. Create model for new product and add routes
13. Renaming
14. Show all products when add new
15. Add style for all products and in home page link to my social media
16. Add alert when we have a problem in client
17. Add btn to open product and style to this; price for product
18. When url is uncorrect and work with input price, name has be shorter than 45 letters
19. Add max width to image in all page; editing products
20. Add to favourite; output id products in the favourite
21. Show and attribute products in the favourite
22. Delete products from the favourite (resolve bugs)
23. Delete products from all list
24. Add msg when edit/delete/add product; update method - edit product
25. When add new product or add to favourite remember a user
26. Some updates to the favourite

`Session`

1. Add session, hidding pages for non- auth user and show for auth
2. Save session, delete our temporary user
3. Session in DB, hidding buttons 'edit' 'add to favourite' for non-authenticated user
4. Secure routes, that means, when non-auth user try to go on routes like favourite
5. Add middleware for user, and logout routes move to main routes
6. When the user is logged in, save the session

`Work with email`

7. Object configuration(create file with constants)
8. Setting email service when user do a registration(sendgrid=>have to register in sendgrid, verify email, answer the questions for what you want to use sendgrid, create api key, verify sending-email, connect for node)
9. Update mail, when user register on this site
10. Password recovery(on login page add button - forgot a password); add btn, check email in db, generate a random key, send message to email for reset password
11. Add page for new password(add route, when we have to reset password)
12. Changing password(check user, token, hash new password)

`Updating website`

13. When user add product, for another user don't allow edit btn; secure delete
14. Error 404(when user input unexisted route)
15. Create profile page(routes, beauty, page)
16. Post to profile page, upload/change avatar photo
17. For add-page, upload photo
18. For edit-product, upload new photo
19. Read product, settings image
20. Other favourite to each user
21. Add new branch
22. Some updating on the favourite page
23. Preparing to btn 'contact with this candidate'
24. Add logic to communications with candidate
25. Add new branch
26. Add history table of communication page
27. Delete from history; and some styles for table of communication

`Solving some bugs and adding new opportunities`

1. Non-owner of the product cannot edit this product; show msg
2. When user change/delete product/profile photo - delete old img from db
3. Checking, that the user can't add to favourite own product/ don't allow adding product twice
4. Solving problem in model with adding and removing product
5. Add to favorites(add id product), solving problem with img when delete product
6. Delete from favorites, show favourites
7. Fix problem with add product or create new user without img, replace empty image url-path to path from folder

<!-- `Deploy` -->
<!-- 1.Secure keys -->
