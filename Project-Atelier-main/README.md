# Project-Atelier

## Overview

Project Atelier comprises a complete redesign of the retail portal designed to modernize the site and improve sale numbers.

## Table of Contents

- [Setup and Installation](#setup-and-installation)
- [Product Description](#product-description)
- [License](#license)
- [Contributors](#contributors)
- [Usage](#usage)


![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# Setup and Installation

You will need Git and Node.js installed to continue.

Additional information needed:
- Personal Access token with github



```bash
# Clone this repository
$ git clone https://github.com/rpp32-fec-morel/Project-Atelier.git

# Go into the repository
$ cd project-atelier

# Install dependencies
$ npm install

#Add Personal Access token to config.js file

# Run webpack
$ npm run build

# Run App
$ npm start

# Access a local copy
// Head to your browser -> localhost:3000
```

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

# Product Description

### Product consists of the following modules
- [Product Overview](#product-overview)
- [Ratings & Reviews](#ratings-and-reviews)
- [Questions & Answers](#questions-and-answers)
- [Related Items and Comparison](#related-items-and-comparison)
## Description

#### Product Overview
![mode](http://g.recordit.co/YH5HL0izvi.gif)

The Overview located at the top-most position of the page.  The functionality contained within this module can be divided into several pieces:
- Image gallery which displays the following:
    - Default Gallery
        - Displays main image as well as thumbnail images.
        - Thumbnail images display at most 7 images or less. Up and Down arrows only appear if there are additional pictures to display.
        - Left and right arrows next to the main display image will displayed the previous/next image when clicked. A indicator in the thumbnail gallery will reflect which image is displayed.
    - Expanded Gallery
        - Displays a main image as well as thumbnail images.
        - Clicking main image will put all focus on the main image and hide everything else. Click the image again will bring up a magnifyer to view the displayed picture at 2.5x the zoom. Clicking again will bring the user back to the main view of the expanded gallery.
        - The left and right arrows will displayed the previous/next image. A indicator in the thumbnail gallery will reflect which image is displayed.
- Product information
    - Displays product info and slogan below the main display image.
    - The type of product, product name, and pricing is located to the right of the display image.
        - If product is on sale, the original price will be crossed out with a sale price displayed right next to it.
    - A clickable anchor for Reading reviews is located at the top left of the page.
- Style selector consists of the following:
    - Size Selector
        - Displays all available sizes of the current product. Disabled if no sizes are available.
    - Quantity Selector
        - Displays a selectable quantity up to a max of 15. Selector is disabled until a size is selected
    - Add to "My Outfit" button
        - Consister of a button with a outlined star
        - Clicking the button will add current product to my outfit carousel below. Star will change from outline to solid.
        - Clicking the button again will remove the current product from the outfit carousel. Star will change from solid to outlined.
    - Selectable Styles
        - All style options are displayed in rows of 4.
        - Clicking each style updates the image gallery with photos of the corresponding style.
        - The selected style name is displayed above the style images.
- Add to cart
    - Add To Cart Button
        - Alerts the user that product has been "Added to Cart"


#### Related Items and Comparison
![mode](http://g.recordit.co/NyqShdwGp5.gif)

The Related Items and Comparison Widget comprises of two modules:
- Related Products
- My Outfits

The Related Products module allows the user to be able to see any products that are related to the current product that is shown on the overall product page. The category, price, name, and rating of the products are shown, as well as an image of the main style of the product.

Clicking on one of the Related Products will alter the main data to show the product data for the product that has been clicked on.

Sets of 4 Related Products are shown at a time, and if the total of related products for the main product is more than 4, a right arrow is displayed at the end of the module. Clicking on the arrow will display the next set of related products (up to a maximum of 4 products). The same concept is handled by a left arrow button that is displayed after clicking on the right arrow button. The left arrow button allows the user to click and display the previous set of related products.

The My Outfits module allows the user to be able to add the current product shown on the overall product page to be added to a personal "My Outfits" list. The "X" button allows the user to remove the outfit/item. The "Favorites" Star button in the Product Overview Module is linked to this, and any outfit that is added or removed is also reflected via the triggering of the "Favorites" Star button in the Product Overview Module.

Clicking on one of the My Outfits will alter the main data to show the product data for the product that has been clicked on.

The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.


#### Questions and Answers
![mode](http://g.recordit.co/KThWuhhUJs.gif)

The Questions & Answers module will allow asking and answering of questions for the product selected.  The functionality contained within this module can be divided into several pieces:
- View questions
- Search for a question
- Asking a question
- Answering a question

This component will extend the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.

All questions will be asked and answered per product.  Specific styles will not be accounted for within the Questions & Answers module.

Each question can have unlimited number of answers. Also each question has a "helpful?" link and a "yes" link. Next to the link there is a helpfullness counter. By pressing this button you confirm the question as helpful by increasing the counter. Double-clicking is prohibited - second click on the button does not affect the counter, and an error message is logged to the console.

Same as question, each answer has a helpful link and a helpfullness counter, and the double-clicking is prohibited in the same manner.

Additionally every answer has a Report link (unlike the questions, which do not have such link). If a user considers the answer inappropriate one can click the link, changing the link text from "report" to "reported" and the question is being hidden. The answer is not deleted from the server, but it is no longer shown.

The component supports the search functionality. The search triggers automatically when the visitor inputs 3 or more characters into the search string. After the search action is fired, the user sees the questions filtered against the search substring (case-insensitive).

The user can add a new question by invoking the "Add new question" form. It has 3 input fields:
 - the question body
 - the user's nickname
 - the user's email
The new question form has a "submit" button. When it is pressed an API request is generated and send if all fields have been properly filled and checked against the validation procedure (e.g. an email should be in appropriate format).
If the validation procedure fails the request is not sent, but the user sees a red error message next to the buttons.

Also the form has a button "close without submitting", which lets the user to close the form unconditionally without submitting any data.

Each question has the "add new answer" link. It has 3 input fields:
 - the answer body
 - the user's nickname
 - the user's email
And a button "upload photos", which permits attaching up to 5 photos to the answer.

The new answer form has a "submit" button. When it is pressed an API request is generated and send if all fields have been properly filled and checked against the validation procedure (e.g. an email should be in appropriate format).
If the validation procedure fails the request is not sent, but the user sees a red error message next to the buttons.

Also the form has a button "close without submitting", which lets the user to close the form unconditionally without submitting any data.

If a question has more than 2 answers, only 2 answers are shown. Under the second answer a "show more answers" button is shown. When it is pressed its text morphs to "collapse answers", and the answers' list is shown in full.

If the component has more than 2 questions, only 2 questions are shown. Under the second question a "show more questions" button is shown. When it is pressed the button completely disappears, and the questions' list is shown in full.

#### Ratings and Reviews
![mode](http://g.recordit.co/csF2qSTBY6.gif)
The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.  The functionality contained within this module can be divided into several pieces:
- Write new review
    - Allow user to provide overall rating
    - Allow user to recommend this product
    - Allow user to select Characteristics 
    - Allow user to provide Review summary and Review body
    - Allow user to input personal information and upload images
- Reviews List
    - The list should display 2 tiles at a time. If there are more than 2 reviews that have been written for the given product, a button for “More Reviews” will appear below the list.
    - If there are 2 or less reviews for the given product, then the button will not appear.
    - Clicking this button will cause up to 2 additional reviews to appear.   The list should expand, and the review tiles should show in order below the previously loaded questions.
    - As long as there are still unloaded reviews, the button will remain below the list.  Once all of the reviews for the product have been loaded, the button should no longer appear
- Sorting
   - Helpful: This sort order will prioritize reviews that have been found helpful.  The order can be found by subtracting “No” responses from “Yes” responses and sorting such that the highest score appears at the top.
   - Newest:  This is a straightforward sort based on the date the review was submitted.  The most recent reviews should appear first.
   - Relevance: Relevance will be determined by a combination of both the date that the review was submitted as well as ‘helpfulness’ feedback received.  This combination should weigh the two characteristics such that recent reviews appear near the top, but do not outweigh reviews that have been found helpful.  Similarly, reviews that have been helpful should appear near the top, but should yield to more recent reviews if they are older.
- Rating Breakdown
   - Rating average.
   - Recommendations.
- Product Breakdown
   - Display feedback on specific characteristics of the product. 


This component will extend the ability to write, read, and browse through reviews for the current product.

All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

### <a name="Usage"></a> Usage 
- React
- Node
- Express
- Enzyme
- React testing library
- AWS(EC2)
- Webpack

### <a name="Contributors"></a> Contributors (in Alphabetical Order)

<p>
  :boy: <b>Ash Tsai</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/ashtsai14">@ashtsai14</a> <br>

  :woman: <b>Jenya Rusinova</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/jenrusinova">@jenrusinova</a> <br>

  :boy: <b>Peter Park</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/ppark051191">@ppark051191</a> <br>

  :boy: <b>Yanlin Ye</b> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; GitHub: <a href="https://github.com/a244629128">@a244629128</a> <br>
</p>

