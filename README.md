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
20. Add to cart; output id products in the cart
21. Show and attribute products in the cart
22. Delete products from the cart (resolve bugs)
23. Delete products from all list
24. Add msg when edit/delete/add product; update method - edit product
25. When add new product or add to cart remember a user
26. 1. Some updates to the cart

`Session`

1. Add session, hidding pages for non- auth user and show for auth
2. Save session, delete our temporary user
3. Session in DB, hidding buttons 'edit' 'add to cart' for non-authenticated user
4. Secure routes, that means, when non-auth user try to go on routes like card
5. Add middleware for user, and logout routes move to main routes
6. When the user is logged in, save the session

`Work with email`

7. Object configuration(create file with constants)
8. Setting email service when user do a registration(sendgrid=>have to register in sendgrid, verify email, answer the questions for what you want to use sendgrid, create api key, verify sending-email, connect for node)
9. Update mail, when user register on this site
