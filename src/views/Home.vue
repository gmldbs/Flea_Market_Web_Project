<template>
  <div>
    <Banner />
    <div class="post-section blog-v3 load-more-contain section-gap">
      <div class="container">
        <h2 class="text-capitalize font-2x mb-4">Recently added product</h2>
        <div class="row">
          <div
            class="col-sm-12 col-md-6 col-lg-4"
            v-for="(product,index) of Products"
            :key="index"
          >
            <div class="card border-0 border-rad mb-0 clickable" style="height: 550px; display: grid; grid-template-rows: 260px 200px;" >
              <div v-if="product.state=='sold'" style="height:260px;display:flex; justify-content:center; align-items:center;">
                <img
                  class="center"
                  :src="product_images[index]"
                  style="margin-top: 20px; width: auto; height: auto; max-width: 280px; max-height: 260px;"
                />
              </div>
              <a v-else style="height:260px;display:flex; justify-content:center; align-items:center;" @click="Product_detail(product)">
                <img
                  class="center"
                  :src="product_images[index]"
                  style="margin-top: 20px; width: auto; height: auto; max-width: 280px; max-height: 260px;"
                />
              </a>
              <div class="card-body border-rad-bottom" style="text-align:center">
                <div v-if="product.state=='sold'">
                  <h4 class="card-title mb-2">
                  {{product.product_name}}
                  </h4>
                  <p class="card-text">{{product.product_explain}}</p>
                  <div class="text-danger font-weight-med font-lg mb-4" v-if="product.state=='sold'">
                    SOLD OUT
                  </div>
                </div>
                <a v-else @click="Product_detail(product)">
                <h4 class="card-title mb-2">
                  {{product.product_name}}
                </h4>
                <p class="card-text">{{product.product_explain}}</p>
                <div class="text-danger font-weight-med font-lg mb-4" v-if="product.state=='sold'">
                  SOLD OUT
                </div>
                <div v-else-if="!product.isAuction">
                  <p v-if="product.product_price == 0" class="text-secondary font-weight-med font-lg mb-4">
                      무료나눔
                  </p>
                  <p v-else class="text-primary font-weight-med font-lg mb-4">
                    ${{product.product_price}}
                  </p>
                </div>
                <p v-else class="text-primary font-weight-med font-lg mb-4">
                  Current : ${{product.product_price}}
                </p>
                </a>
                <p>{{product.how_to_sell}}</p>
                <!--v-btn class="ma-2" outlined color="indigo" @click="Product_detail(product)">Buy Now</v-btn-->
                <div class="card-footer pt-2 p-0" style="margin-top=10px">
                  <div class="d-flex justify-content-between">
                    <a class="d-flex align-content-start text-muted">
                      <i class="fa fa-user-circle-o align-self-center mr-2"></i>
                      <span class="font-sm" style="margin-right:10px">{{product.seller}}</span>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star-half-alt"></i>
                    </a>
                    <a v-if ="product.isAuction" class="d-flex align-content-end">
                      <i class="fa fa-calendar-o mr-2 align-self-center"></i>
                      <span class="font-sm text-capitalize">{{product.Auction_date | moment('YYYY-MM-DD HH:mm:ss')}}</span>
                    </a>
                  </div>
                </div>
                <div style="margin-top:20px">
                  <a>
                    <i v-if="isWish[index]" class="mdi mdi-heart mdi-24px" style="color:red;margin-right:30px" @click="remove_wish(product)"></i>
                    <i v-else class="mdi mdi-heart-outline mdi-24px" style="color:red;margin-right:30px" @click="add_wish(product)"></i>
                  </a>
                  <a>
                    <i v-if="isCart[index]" class="mdi mdi-cart mdi-24px" @click="remove_cart(product)"></i>
                    <i v-else class="mdi mdi-cart-outline mdi-24px" @click="add_cart(product)"></i>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service section-gap">
      <div class="container">
        <div class="section-title-wrapper">
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
    
    <div class="send-msg-form bg-gray-dark style-form section-gap">

        <div class="container">
			<div class="section-title-wrapper">
				<div class="row">
					<div class="col-sm-12 col-md-6 mx-auto text-center">
						<h2>Send Me Message</h2>
						<p class="text-white mb-0 lead">You can send me the Message to inform some bugs about this Web by this part.</p>
					</div>
				</div>
			</div>
          <div class="row">
            <div class="col-sm-12 col-md-10 col-lg-7 mx-auto">
              <form>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group mb-4">
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        id="inputEmail4"
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-4">
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        id="inputEmail4"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group mb-4">
                      <textarea name id class="form-control form-control-lg" placeholder="Message"></textarea>
                    </div>
                  </div>
                </div>

                <button type="submit" class="btn text-white btn-success btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
  
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner/Banner.vue";
export default {
  data() {
    return {
      product_images: [],
      Products: null,
      Wishlist: [],
      isWish: [],
      user: null,
      password: null,
      isCart: [],
      Cart: [],
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
    };
  },
  firestore() {
    return {
      Products: this.$database.collection('Products').limit(3)
    }
  },
  mounted() {
    this.user = this.$store.getters.getUser
    if(this.user) 
    {
      this.Wishlist = this.user.Wishlist
      this.Cart = this.user.Cart
    }
    else 
    {
      this.Wishlist = []
      this.Cart = []
    }
  },
  methods: {
    Product_detail(product) {
      this.$store.commit('setProduct',product)
      this.$router.push('product-detail')
    },
    add_wish(product) {
      if(this.user == null) 
      {
        alert("You can add this product to your Wishlist after login.")
        return
      }
      this.Wishlist.push(product.productID)
      this.$database.collection("Users").doc(this.user.userID).set({
        Wishlist : this.Wishlist
      }, {merge: true})
    },
    remove_wish(product) {
      if(this.user == null) 
      {
        alert("You can add this product to your Wishlist after login.")
        return
      }
      this.Wishlist.splice(this.Wishlist.indexOf(product),1)
      this.$database.collection("Users").doc(this.user.userID).set({
        Wishlist : this.Wishlist
      }, {merge: true})
    },
    add_cart(product) {
      if(this.user == null) 
      {
        alert("You can add this product to your Cartlist after login.")
        return
      }
      this.Cart.push(product.productID)
      this.$database.collection("Users").doc(this.user.userID).set({
        Cart : this.Cart
      }, {merge: true}).then(function(){
      })
    },
    remove_cart(product) {
      if(this.user == null) 
      {
        alert("You can add this product to your Cartlist after login.")
        return
      }
      this.Cart.splice(this.Cart.indexOf(product.productID),1)
      this.$database.collection("Users").doc(this.user.userID).set({
        Cart : this.Cart
      }, {merge: true}).then(function(){
      })
    },
  },
  watch: {
    Products: function () {
      this.product_images = []
      this.isWish=[]
      this.isCart=[]
      console.log(this.Products)
      for(var i=0;i<this.Products.length;i++)
      {
        this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
        this.Products[i].Auction_date = new Date(this.Products[i].Auction_date.seconds * 1000)
        console.log(new Date(this.Products[i].Auction_date.seconds * 1000))
        if(this.Products[i].product_explain.length > 50)
        {
          this.Products[i].product_explain = this.Products[i].product_explain.slice(0,50)
          this.Products[i].product_explain += '...'
        }
        var isPush = false
        for(var j=0;j<this.Wishlist.length;j++)
        {
          if(this.Wishlist[j] == this.Products[i].productID)
          {
            this.isWish.push(true)
            isPush = true
            break
          }
        }
        if(!isPush) this.isWish.push(false)
        isPush = false
        console.log(this.Cart)
        for(var j=0;j<this.Cart.length;j++)
        {
          if(this.Cart[j] == this.Products[i].productID)
          {
            this.isCart.push(true)
            isPush = true
            break
          }
        }
        if(!isPush) this.isCart.push(false)
      }
    },
    Wishlist: function () {
      console.log("here")
      this.isWish=[]
      for(var i=0;i<this.Products.length;i++)
      {
        var isPush = false
        for(var j=0;j<this.Wishlist.length;j++)
        {
          if(this.Wishlist[j] == this.Products[i].productID)
          {
            this.isWish.push(true)
            isPush = true
            break
          }
        }
        if(isPush) continue
        this.isWish.push(false)
      }
    },
    Cart: function () {
      this.isCart=[]
      for(var i=0;i<this.Products.length;i++)
      {
        var isPush = false
        for(var j=0;j<this.Cart.length;j++)
        {
          if(this.Cart[j] == this.Products[i].productID)
          {
            this.isCart.push(true)
            isPush = true
            break
          }
        }
        if(isPush) continue
        this.isCart.push(false)
      }
      console.log("here?")
    },
  },
  components: {
    Banner,
  }
};
</script>
