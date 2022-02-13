fetch('https://fe-assignment.vaimo.net/')
.then((data)=>{

  /*Logged the needed data from the API*/
  //console.log(data);

  return data.json();
}).then(function(finalData){
  /*displaying the data from the API in a var to be displayed*/
  console.log(finalData);

  /*Checking to see if it will display - yes*/
  //console.log(finalData.product.discount.amount);

  /*
    Start of getting data into the HTML to be displayed on website
  */

  /*Product Image*/
  var prodimg1="";
  finalData.map((values)=>{
    prodimg1=`
    <img src="${values.gallery[0]}" alt="Product image" id="prodimage" />
    `
  });
  document.getElementById("gallery").innerHTML=prodimg1;


  /*Product Title*/
  var prodtitle1="";
  finalData.map((values)=>{
    prodtitle1=`
    ${values.product.name} <label id="tag">${values.product.tags[0]}</label>
    `
  });
  document.getElementById("prodTitle").innerHTML=prodtitle1;


  /*Customer Reviews*/
  var reviews="";
  finaldata.map((values)=>{
    reviews=`
    <label class="ratingAmount"> ${values.product.reviews.rating}</label>
    <label class="ReviewCount">${values.product.reviews.count} Reviews</label>
    <label class="buyers">${values.product.reviews.total_buyers} Buyers</label>
    `
  });
  document.getElementById("ratings").innerHTML=reviews;


  /*Pricing Amounts*/
  var amount="";
  finaldata.map((values)=>{
    amount=`
    <label class="price">${values.product.options[2].price.currency[2].value} - 
    ${values.product.options[0].price.currency[2].value}</label> 
    <label class="label5">/ Option </label>
    <lable id="choseOpt"> 2options</label> 
    <label class="label5">(Min.Order)</label>
    <br>
    <!--old prices-->
    <label class="oldPrice"> ${values.product.options[2].old_price.currency[2].value} - 
    ${values.product.options[0].old_price.currency[2].value}</label>
    `
  });
  document.getElementById("amount").innerHTML=amount;


  /*Discount*/
  var dis="";
  finaldata.map((values)=>{
    dis=`
    <label class="disAmount"> ${values.product.amount} OFF </label>
    <label class="disEnd">Discount ends in: <span class="countDown">discountCountDown</span>  </label>
    `
  });
  document.getElementById("Discount").innerHTML=dis;


  /*Available Options*/
  var AvailOpt="";
  finalData.map((values)=>{
    AvailOpt=`
    <table style="width:100%">
                <tr>
                    <th>${values.product.options}:</th>
                  <td>${values.product.options[1].label}</td>
                  <td>${values.product.options[1].price.currency[1].value}</td>
                  <!--QTY Form-->
                  <td> 
                      <form>
                        <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease QTY Value">
                            <img src="images/icons8-minus.png" alt="Minus Icon" class="formIcon1">
                        </div>
                        <input type="number" id="number" value="0"/>
                        <div class="value-button" id="increase" onclick="increaseValue()" value="Increase QTY Button">
                            <img src="images/icons8-plus_math.png" alt="Minus Plus" class="formIcon2">
                        </div>
                      </form>
                  </td>
                </tr>
                <tr>
                    <th></th>
                  <td>${values.product.options[0].label}</td>
                  <td>${values.product.options[0].price.currency[0].value}</td>
                  <td>
                    <form>
                        <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease QTY Value">
                            <img src="images/icons8-minus.png" alt="Minus Icon" class="formIcon1">
                        </div>
                        <input type="number" id="number" value="0"/>
                        <div class="value-button" id="increase" onclick="increaseValue()" value="Increase QTY Button">
                            <img src="images/icons8-plus_math.png" alt="Minus Plus" class="formIcon2">
                        </div>
                      </form>
                  </td>
                </tr>
                <tr>
                <th></th>
                <td>${values.product.options[2].label}</td>
                <td>${values.product.options[2].price.currency[2].value}</td>
                  <td> 
                    <form>
                        <div class="value-button" id="decrease" onclick="decreaseValue()" value="Decrease QTY Value">
                            <img src="images/icons8-minus.png" alt="Minus Icon" class="formIcon1">
                        </div>
                        <input type="number" id="number" value="0"/>
                        <div class="value-button" id="increase" onclick="increaseValue()" value="Increase QTY Button">
                            <img src="images/icons8-plus_math.png" alt="Minus Plus" class="formIcon2">
                        </div>
                    </form>
                  </td>
                </tr>
              </table>
    `
  });
  document.getElementById("prodOptions").innerHTML=AvailOpt;


/*Shipping Information*/
var shipInfo="";
finaldata.map((values)=>{
  shipInfo=`
  <div class="shipBy">
    Ship to ${values.product.shipping.method.cost.country} <br> by [${values.product.shipping.method.title}
  </div>
  <div class="finalPrice">
  ${values.product.shipping.method.cost.value} 
  </div>
  <p class="addBoxText">Lead Time ${values.product.shipping.Lead_time.value} </p>
  <p class="addBoxText">Shipping time ${values.product.shipping.method.shipping_time.value} </p>
  `
});
document.getElementById("addBox").innerHTML=shipInfo;

/*Javascript Countdown*/
const deadline = finaldata.product.discount.end_date;

function getTimeRemaining(endtime){
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

const total = Date.parse(endtime) - Date.parse(new Date());

const seconds = Math.floor( (t/1000) % 60 );

return {
  total,
  days,
  hours,
  minutes,
  seconds
};

getTimeRemaining(deadline).minutes

function initializeClock(coundDown, endtime) {
  const clock = document.getElementById("countDown");
  const timeinterval = setInterval(() => {
    const t = getTimeRemaining(endtime);
    clock.innerHTML = t.days + 'd' +
                      t.hours + 'h' +
                      t.minutes + 'm' 
                      + t.seconds +  's';
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  },1000);
}

})
//Incase an error accures
.catch((err)=>{
  console.log(err);
})


/* QTY Buttons Code*/
function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}


/*Code for Modal Image*/
var modal = document.getElementById("myModal");

var img = document.getElementById("prodimage");
var modalImg = document.getElementById("img1");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() { 
  modal.style.display = "none";
}
