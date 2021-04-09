<template>
  <div>
    <PageTitle
      class="page-title"
      headerTitle="Happy Shopping"
      headerSubTitle="You can see so many secondary goods! Happy Shopping!"
    ></PageTitle>
    <div style="display: grid; grid-template-columns: 20% 80%; margin-top:50px">
      <div class="col-sm-12 col-md-12 col-lg4">
        <div class="blog-sidebar">
          <div class="card border-rad mb-5">
            <div class="py-4 px-3">
              <h4 class="mb-3">Search</h4>
              <form class="send-mail d-block">
                  <div class="form-row justify-content-center">
                    <div class="form-group col-12">
                      <p class="mb-3">Search by Product name</p>
                      <input type = "text" class="form-control w-100" placeholder="Search for..." aria-label="Search for..." v-model="search_product" />
                    </div>
                    <div class="form-group col-12">
                      <p class="mb-3">Search by Seller nickname</p>
                      <input type = "text" class="form-control w-100" placeholder="Search for..." aria-label="Search for..." v-model="search_nickname"/>
                    </div>
                    <p class="mb-3">Search by Hope price ($) </p>
                    <div style="display: grid; grid-template-columns: 40% 10% 40%; grid-gap:5%">
                        <input type = "text" class="form-control w-100" placeholder="Min" aria-label="Search for..." v-model="search_min"/>
                        <h3>~</h3>
                        <input type = "text" class="form-control w-100" placeholder="Max" aria-label="Search for..." v-model="search_max"/>
                    </div>
                    <div style="margin-top:10px col-12">
                      <p>How to sell category</p>
                      <select class="form-control form-control-md" v-model="search_how">
                        <option selected>Select Way</option>
                        <option>Direct transaction</option>
                        <option>Deposit and delivery</option>
                        <option>Direct transaction or deposit and delivery</option>
                      </select>
                    </div>
                    <div class="col-12" style="margin-top:10px">
                      <p>Product State</p>
                      <select class="form-control form-control-md" v-model="search_state">
                        <option selected>ALL</option>
                        <option>SOLD OUT</option>
                        <option>NOT SOLD OUT</option>
                      </select>
                    </div>
                    <div>
                      <v-checkbox
                        v-model="search_Auction"
                        label="Auction Products"
                        color="secondary"
                        hide-details
                      ></v-checkbox>
                      <v-checkbox
                        v-model="search_Fixed"
                        label="Fixed Price Products"
                        color="secondary"
                        hide-details
                      ></v-checkbox>
                  </div>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div class="post-section">
      <div class="container">
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
                      <!--i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star-half-alt"></i-->
                    </a>
                    <a v-if ="product.isAuction" class="d-flex align-content-end">
                      <i class="fa fa-calendar-o mr-2 align-self-center"></i>
                      <span class="font-sm text-capitalize">{{product.Auction_date | moment('YYYY-MM-DD HH:mm:ss')}}</span>
                    </a>
                  </div>
                </div>
                <div style="margin-top:20px" v-if="product.state!='sold'">
                  <a>
                    <i v-if="isWish[index]" class="mdi mdi-heart mdi-24px" style="color:red;margin-right:30px" @click="remove_wish(product)"></i>
                    <i v-else class="mdi mdi-heart-outline mdi-24px" style="color:red;margin-right:30px" @click="add_wish(product)"></i>
                  </a>
                  <a v-if="product.how_to_sell != 'Direct transaction'">
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
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      password: null,
      product_images: [],
      Products: null,
      Wishlist: [],
      Cart: [],
      isWish: [],
      isCart: [],
      search_product: "",
      search_nickname: "",
      search_max: "",
      search_min: "",
      search_how: "Select Way",
      search_Auction: true,
      search_Fixed: true,
      search_state: "ALL",
      Products: null,
    };
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
  firestore() {
    return {
      Products: this.$database.collection('Products'),
      origin_Products: this.$database.collection('Products')
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
      }, {merge: true}).then(function(){
      })
    },
    remove_wish(product) {
      if(this.user == null) 
      {
        alert("You can add this product to your Wishlist after login.")
        return
      }
      this.Wishlist.splice(this.Wishlist.indexOf(product.productID),1)
      this.$database.collection("Users").doc(this.user.userID).set({
        Wishlist : this.Wishlist
      }, {merge: true}).then(function(){
      })
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
    search_query() {
      if(this.search_product == "" && this.search_nickname == "" && this.search_max == "" && this.search_min == "" && this.search_how == "Select Way" && this.search_Auction && this.search_Fixed && this.search_state=="ALL")
      {
        this.Products = this.origin_Products
        return
      }
      var new_products = []
      if(this.search_product != "")
      {
        for(var i=0; i<this.origin_Products.length; i++)
        {
          if(this.origin_Products[i].product_name.includes(this.search_product)) new_products.push(this.origin_Products[i])
        }
      }
      else new_products = this.origin_Products
      var nnew_products = []
      if(this.search_nickname != "")
      {
        for(var i=0; i<new_products.length; i++)
        {
          if(new_products[i].seller.includes(this.search_nickname)) nnew_products.push(new_products[i])
        }
      }
      else nnew_products = new_products
      var nnnew_products = []
      if(this.search_min != "")
      {
        for(var i=0; i<nnew_products.length; i++)
        {
          if(parseInt(nnew_products[i].product_price) >= parseInt(this.search_min)) nnnew_products.push(nnew_products[i])
        }
      }
      else nnnew_products = nnew_products
      var nnnnew_products = []
      if(this.search_max != "")
      {
        for(var i=0; i<nnnew_products.length; i++)
        {
          if(parseInt(nnnew_products[i].product_price) <= parseInt(this.search_max)) nnnnew_products.push(nnnew_products[i])
        }
      }
      else nnnnew_products = nnnew_products
      var nnnnnew_products = []
      if(this.search_how == "Select Way") nnnnnew_products = nnnnew_products
      else 
      {
        for(var i=0; i<nnnnew_products.length; i++)
        {
          if(nnnnew_products[i].how_to_sell == this.search_how) nnnnnew_products.push(nnnnew_products[i])
        }
      }
      var option_products = []
      if(this.search_Auction && this.search_Fixed) option_products = nnnnnew_products
      else 
      {
        if(this.search_Auction)
        {
          for(var i=0;i<nnnnnew_products.length;i++)
          {
            if(nnnnnew_products[i].isAuction) option_products.push(nnnnnew_products[i])
          }
        }
        else if(this.search_Fixed)
        {
          for(var i=0;i<nnnnnew_products.length;i++)
          {
            if(!nnnnnew_products[i].isAuction) option_products.push(nnnnnew_products[i])
          }
        }
      }
      var state_products = []
      if(this.search_state == "ALL") state_products = option_products
      else if(this.search_state == "SOLD OUT")
      {
        for(var i=0;i<option_products.length;i++)
        {
          if(option_products[i].state == "sold") state_products.push(option_products[i])
        }
      }
      else
      {
        for(var i=0;i<option_products.length;i++)
        {
          if(option_products[i].state != "sold") state_products.push(option_products[i])
        }
      }
      this.Products = state_products
    }
  },
  watch: {
    Products: function () {
      this.product_images = []
      this.isWish=[]
      this.isCart=[]
      for(var i=0;i<this.Products.length;i++)
      {
        this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
        if(new Date(this.Products[i].Auction_date.seconds * 1000) != "Invalid Date") this.Products[i].Auction_date = new Date(this.Products[i].Auction_date.seconds * 1000)
        if(this.Products[i].isAuction&&this.Products[i].Auction_date <= new Date())
        {
          this.$database.collection('Products').doc(this.Products[i].productID).set({
            state: "sold"
          },{merge:true})
        }
        if(this.Products[i].product_explain.length > 50)
        {
          this.Products[i].product_explain = this.Products[i].product_explain.slice(0,47)
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
    search_product() {
      this.search_query()
    },
    search_nickname() {
      this.search_query()
    },
    search_min() {
      this.search_query()
    },
    search_max() {
      this.search_query()
    },
    search_how() {
      this.search_query()
    },
    search_Auction() {
      this.search_query()
    },
    search_Fixed() {
      this.search_query()
    },
    search_state() {
      this.search_query()
    },
    Wishlist: function () {
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
    },

  },
};
</script>