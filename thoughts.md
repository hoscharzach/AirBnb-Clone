What was the most challenging part of this project?

The most challenging part was dealing with the date object probably. It took a lot of research to figure out how to properly format dates and create the logic necessary to check if new reservations were overlapping or conflicting with reservations already in the database.

Second place was probably validating query parameters and creating all of the conditionals to make sure that that they returned the proper data. I'm still not sure the best way to refactor it, it's honestly a mess.

What part of your project are you most proud of?

To be honest, I'm not proud of any one particular thing, because I know I can improve almost every aspect. I was definitely a bit proud of getting all of my associations and seeders working correctly on the first try, though (aside from a couple misplaced onDelete CASCADES).


What are things you want to go back and improve?

Mostly I want to refactor the query parameter logic for GET /spots. It's too much, and I know there has to be a better way.

Secondly, a relatively simple fix when I have time would be to put all of my express-validator chains into one file instead of duplicating them throughout my routes.

Lastly, I really want to figure out how to eager load with aggregate data. I tried many times to return the avgRating and numReviews in one query, but just couldn't get it to work properly with sequelize.
