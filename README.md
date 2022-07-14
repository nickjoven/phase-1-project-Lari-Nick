## Project goal: create a 'lite' version of reddit with content displayed from the reddit API

A block of posts across the top of the page will display on page load, consisting of something like top posts from r/all, additional content will appear after the a user submits a form. The minimum requirement for form submission is a subreddit title, but the user should be able to select (by dropdown) search options such as sort method and unit of time (past hour, day, week). 

Specifications:

Posts will be summarized into a single card with an image background (generic default if n/a) and text overlaid. The following elements will be appended to the DOM using db info:
- a background image
- a heading/div element with a subreddit name
- a heading/div element a thread title
- a heading/div element with a number of upvotes

The user will submit info through a form to display additional content in the main container. This container will be a div that, upon form submission, will display child divs for different posts, each with
- a thumbnail
- a heading/div element with a subreddit name
- a heading/div element a thread title
- a heading/div element with a number of upvotes

NOTES ON THE DATABASE:

1) NOT ALL POSTS HAVE IMAGES
2) SOME POSTS ARE VIDEOS
3) NOT ALL POSTS HAVE SELFTEXT
4) IT'S NOT INHERENTLY CLEAR WHICH DATA POINT SHOULD BE USED TO DETERMINE CONDITIONAL LOGIC

For ease of displaying things to the page, we should maintain an array of objects for both containers. When we fetch data, we should update an array with objects that contain the fetched data. These objects should populate the top div on page load.

When the user fills out the form and hits submit, we should fetch data again and simply push to a new array with a new set of objects. Or an array inside an array. Who knows?

## Summary for getting started 7-12-2022

FINAL PROJECT GOALS:

- Finish div at top of screen (display text from object over background)
- Complete the form/improve form functionality and appearance
- Include a box in lower 1/2 of screen that will show a preview of posts based on values input into the form

ADDITIONAL POSSIBILITIES:

- Option to load more posts at the top (get the next set of 4 from the database, for instance, or a side scroller or carousel)
- Option to toggle types of content (e.g. only images/videos)
- Option to remove the top bar
- Option to replace the top bar with "favorites"

=== STATUS UPDATE ===

Videos correctly display.
Text displays over videos.
Lari has been working on formatting text to look better.

To-do:

Decide what to do with the information on submit. Currently, it pulls up 4 posts from the subreddit.
How should this display?

Options:

4 images, hit a plus sign to show more/load next 4. Basically rerun function with slightly different parameters
ooh. + sign and infinite sign

combine search for multiple reddits to infinitely scroll multiple categories
add favorites

## Summary for continuing 7-13-2022

Basic task goals and assigned deliverables are complete.


ADDITIONAL GOALS:

- Light/Dark mode toggle (easy)
- Remove button hides unless you hover over the parent element (medium)
- Pretend upvote/downvote option 
- Actually do CSS (impossible)
- Error catching (medium)

## Summary for continuing 7-14-2022

NEW GOALS TO ACCOMPLISH BY FRIDAY:

Scrolling to the bottom of the page should invoke another fetch/append function, based on:

1) user's list of favorites
2) user's block list (maybe)
3) subreddits currently displayed

Functionality: assume that the user likes w/e subreddits we initially use. Put those in a list of favorites.
Have a toggle button for 'add to favorites'in the form
Have an option to remove favorites

1) ONLY add to favorites on successful request --- NOT on form submission




