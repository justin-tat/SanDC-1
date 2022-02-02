// GET /products
// Params: {
//   page: // selects page of results to return - DEFAULT: 1
//   count: // how many results per page to returm - DEFAULT: 5
// }

var products = [
  {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140",
        "results": [
          {
            "photos": [
              {
                "thumbnail_url": null
              }
            ]
          }
        ]
    },
  {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69",
        "results": [
          {
            "photos": [
              {
                "thumbnail_url": null
              }
            ]
          }
        ]
    },
  {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40",
        "results": [
          {
            "photos": [
              {
                "thumbnail_url": null
              }
            ]
          }
        ]
    },
    // ...
];

// GET /product/:product_id

var specificProduct = {
  "id": 11,
  "name": "Air Minis 250",
  "slogan": "Full court support",
  "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  "category": "Basketball Shoes",
  "default_price": "0",
  "features": [
  {
          "feature": "Sole",
          "value": "Rubber"
      },
  {
          "feature": "Material",
          "value": "FullControlSkin"
      },
  // ...
  ],
};

// GET /product/:product_id/styles

var style = {
  "product_id": "1",
  "results": [
    {
      "style_id": 1,
      "name": "Forest Green & Black",
      "original_price": "140",
      "sale_price": "0",
      "default?": true,
      "photos": [
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1448526478325-616f2b15b04e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1519098635131-4c8f806d1e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1483056293146-9eac9521932f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1515992854631-13de43baeba1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1525141741567-f89ef016dfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      },
      {
        "thumbnail_url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      },
      {
        "thumbnail_url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
        "thumbnail_url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
      },
      {
        "thumbnail_url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
        "url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
       }
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "L"
        },
      }
    },
    {
      "style_id": 2,
      "name": "Desert Brown & Tan",
      "original_price": "140",
      "sale_price": "0",
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1514866726862-0f081731e63f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1519689373023-dd07c7988603?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1506932248762-69d978912b80?ixlib=rb-1.2.1&auto=format&fit=crop&w=2089&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1421941027568-40ab08ee5592?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
      }
      ],
      "skus": {
        "37": {
          "quantity": 8,
          "size": "XS"
        },
        "38": {
          "quantity": 16,
          "size": "S"
        },
        "39": {
          "quantity": 17,
          "size": "M"
        },
      }
    }
  ]
};

// GET /products/:product_id/related

var relatedProducts = [
  2,
  3,
  8,
  7
];

module.exports = { products, specificProduct, style, relatedProducts };