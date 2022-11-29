# Tarnished BnB

This is my full stack AirBnB clone project. Users can create listings for others to view and leave reviews, as well as book stays at locations, as long as they don't own the location. API documentation can be found in the backend directory.

Technologies used:

### Languages
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

### Database/ORM
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Frameworks
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### Front end
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

### Deployment/Other
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### Landing Page
![landingpage](https://res.cloudinary.com/dpjpitop6/image/upload/v1669757700/frontpage_erihnd.png)

Here, users can see all of the current listings or click on the profile icon in the top right to sign up or log in. After doing so they can check out their bookings or create a listing of their own.

## The more details page

![More details page](https://res.cloudinary.com/dpjpitop6/image/upload/v1669757779/moredetails_aoihqa.png)

Here, users can see all the details about a spot, such as description and how many bosses/bonfires. Users can scroll down to interact with the create booking section or scroll down further to see reviews for the spot.

## Review Modal

![Review](https://res.cloudinary.com/dpjpitop6/image/upload/v1669757932/review_rgofm1.png)

If the user does not own the spot, and has not already reviewed it in the past, clicking "Add Review" at the bottom of the page opens up this modal. After submitting, the user can see their review, and expand it if the text is too long to fit in the limited box size.

## Upcoming Trips

![Trips](https://res.cloudinary.com/dpjpitop6/image/upload/v1669758067/upcomingtrips_zzdkgr.png)

After selecting a valid date (there's no conflict with other bookings) clicking the "Reserve" button, the user is redirected to this page where they can see any upcoming reservations that they have. Reservations before the current date do not appear.

## Create Listing Form

![CreateListing](https://res.cloudinary.com/dpjpitop6/image/upload/v1669758189/addimages_lczlpu.png)

If the user is logged in, they can click on the menu in the top right and create a new listing. The form has several steps, and the final step (images) is shown in the above screen shot. Users can select up to 5 images at a time to upload to AWS S3 and then if all validations passed up to this point, they will create a new listing. After the uploads are complete, the user is redirected to the more details page for the spot they created.
