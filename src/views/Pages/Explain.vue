<template>
  <div class="about">
    <PageTitle
      headerTitle="What is this Web"
      headerSubTitle="How to use this Flea Market web"
    ></PageTitle>
      <div class="container">
         <div class="service section-gap">
          <div class="row">
            <div class="col-sm-12 col-md-6 mx-auto text-center">
              <h2>Best In Selling &#38; Buying</h2>
              <p class="mb-0 lead">You can sell or buy secondary products by these Services</p>  
            </div>
          </div>
        </div>
        <div class="row col-space">
          <div class="col-sm-12 col-md-6 col-xl-4" v-for="item of data" :key="item.title">
            <div class="rotate-item rounded-border" :class="item.icon.color">
              <div class="overlay-wrap">
                <div class="thumb-wrap">
                  <div class="front-wrap">
                    <div class="front-wrap-info">
                      <i class="font-4x text-white mb-1" :class="item.icon.name"></i>
                      <h5 class="mb-0 info-title text-white">{{item.title}}</h5>
                    </div>
                  </div>
                  <div class="back-wrap">
                    <div class="back-wrap-info">
                      <div class="sec-content">
                        <p class="text-white mb-0">{{item.content}}</p>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      data:[
      {
        "icon":{
          "name":"ion-ios-bulb",
          "color":"bg-custom-primary"
        },
        "title":"Trended Designs",
        "content":"This web design is trended and easy to use functions that include this Web. This design can make the product selling seems to not secondary.",
        "link":"javascript:void(0)",
        "btnBgClass": "btn-outline-warning"
      },
      {
        "icon":{
          "name":"ion-ios-infinite",
          "color":"bg-custom-success"
        },
        "title":" Responsive Design ",
        "content":"This Web support Responsable that can make you use this web more comfortable.",
        "link":"javascript:void(0)",
        "btnBgClass": "btn-outline-primary"
      },
      {
        "icon":{
          "name":"ion-ios-flash",
          "color":"bg-custom-info"
        },
        "title":" Auction Function ",
        "content":"This Web has Auction function that can make user can set Auction end date, Auction start date, Bidding.",
        "link":"javascript:void(0)",
        "btnBgClass": "btn-outline-info"
      },
      {
        "icon":{
          "name":"icon ion-md-nutrition",
          "color":"bg-custom-danger"
        },
        "title":"Direct transaction",
        "content":"This Web support Direct transaction. This Web has Chat function that can buyer contact to seller directly.",
        "link":"javascript:void(0)",
        "btnBgClass": "btn-outline-info"
      },
		  {
        "icon":{
          "name":"icon ion-md-chatboxes",
          "color":"bg-custom-primary"
        },
        
        "title":"Chat Function",
        "content":"This Web has Chat function that can buyer contact to seller directly. Buyer can ask someting to seller and Mediate someting.",
        "link":"javascript:void(0)",
        "btnBgClass": "btn-outline-info"
      },
		  {
        "icon":{
          "name":"icon ion-md-create",
          "color":"bg-custom-warning"
        },
        "title":"Deposit and Delivery",
        "content":"This Web also has Deposit and Delivery function.",
        "link":"javascript:void(0)",
        "btnBgClass": "btn-outline-info"
      }
   ]
    }
  }
};
</script>