 let pageItems = null

      function load () {
        getData().then(items => items.map(item => {
          pageItems = items
          const itemContainer = document.createElement("div")
          itemContainer.innerHTML = `
          
            <div class="itemContainer">

              <div class="row column itemPic">
                <a href="${item.detailsUrl}">
                  <img src="https://www.bhphotovideo.com${item.listingImage}" alt="${item.shortDescription}"/>
                </a>
                <br></br>
              <form>
                <input type="checkbox" name="compare" value="compare">
                <label class="compare" for="compare">Add to Compare</label><br>  
                </form>
              </div>

              <div class="row itemTitleAndInfo column" >
                <div class="itemTitle"><a href="${item.detailsUrl}">${item.shortDescriptionPlusBrand}</a></div>
                <p class="itemCode" >B&H # ${item.itemCode} </p>
                <div class="numberOfReviews">${item.overAllRating} ${item.overAllRating == 1 ? "Star ": "Stars "}from ${item.numberOfReviews} Reviews</div>
                <p class="keyFeatures">Key Features</p>
                <div class="keyFeaturesContent">${sellingPointsText(item.sellingPoints)}</div>
                <a href="${item.detailsUrl}">More Details ></a>
              </div>
              
              <div class="row  priceColumn">
                <p class="price">$${item.price}</p>
                <button class="button" id="cart-button-${item.itemCode}" onclick="addToCart('${item.itemCode}')">Add To Cart</button>
              <p>Add to Wish list</p>
                <p>${item.stockMessage}</p>
                <div class="commentMessage">${item.shipTime}</div>
                ${item.availableStore ? '<p class="blue">Free store pick up in 30 mins</p>':""}
              </div>
            </div>
            
          `
          document.getElementById("itemsContainer").appendChild(itemContainer)

        }) )
      }
      let inCart = []
      function addToCart(itemCode) {
        if (inCart.includes(itemCode) ){
          return 
        }
        inCart.push(itemCode)
        refreshCart() 
        document.getElementById(`cart-button-${itemCode}`).innerText = "in cart"
      }
 
      function refreshCart() {
                
        let whatsInCart = inCart.map(itemCode => {
          const item = pageItems.find(item => itemCode === item.itemCode)
          if (item) {
            return `
              <div class="cartItem">
                <div class="column">
                  <a href="${item.detailsUrl}">
                    <img src="https://www.bhphotovideo.com${item.itemImages[0].thumbnail}" alt="${item.shortDescription}"/>
                  </a>
                </div>
                <div class="columnCartTitle"> ${item.shortDescriptionPlusBrand}
                  <button onclick="removeFromCart('${item.itemCode}')">Delete</button>
                   <p>Qty: 1</p>
                </div>
                
              </div>
            `
          }
        }).join("")
        
          document.getElementById("cart").innerHTML = `
          <div class="cartCount" > ${inCart.length} items in cart  </div>
          ` + "<br></br>" + whatsInCart 
      
      }

      function removeFromCart(itemCode) {
        inCart = inCart.filter(cartItem => itemCode !== cartItem)
        refreshCart() 
        document.getElementById(`cart-button-${itemCode}`).innerText = "Add To Cart"
      }

      function sellingPointsText(sellingPoints) {
        let sp = sellingPoints.slice(0, 4).map(p => `<li> ${p}</li>`).join('');
        return `<ul>${sp}</ul>`
      }

      function getData() {
        return fetch('https://raw.githubusercontent.com/roitblatari/bandh/master/data.json')
        .then((res) => res.json() ).then(data =>  data.items )
       }
      window.onload = load; 
