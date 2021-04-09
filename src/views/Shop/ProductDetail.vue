<template>
  <div>
    <PageTitle
      headerTitle="Product Detail"
      headerSubTitle="You can see Product detail information"
    ></PageTitle>
    <div class="product-wrapper section-gap pb-0">
      <div class="container">
        <div class="row mb-4">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="mb-4">
              <a class="feature-box-thumb">
                <img :src="images[selected]" class="img-fluid" alt="product image" @click="image_big()"/>
              </a>
              <!-- feature box thumb closed -->
            </div>
            <div class>
              <ul class="list-unstyled p-gallary-thumb list-p-detail row">
                <li v-for="(image,index) in images" :key="index" class="col-6 col-sm-3 col-md-3 mb-4">
                  <a><img :src="images[index]" class="img-fluid" alt="product image" @click="select_image(index)"/></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md-12 col-lg-6 product-detail-content mb-4">
            <div class="mb-3">
              <h2 class="text-capitalize mb-3">{{product.product_name}}</h2>
              <h4 v-if="product.product_price==0" class="font-26 text-primary">
                Free
              </h4>
              <h4 v-else class="font-26 text-primary">
                ${{product.product_price}}
              </h4>
            </div>
            <div class="mb-4">
              <p class="mb-0">
                <span class="font-weight-bold">How to sell : {{product.how_to_sell}}</span>
              </p>
            </div>
            <div></div>
            <div v-if="!product.isAuction">
              <button v-if="product.how_to_sell!='Deposit and delivery'" class="btn btn-primary btn-lg" @click = "goChat()" style="margin-right:10%">Contact Seller</button>
              <button class="btn btn-primary btn-lg" @click = "open_buy()">Buy now</button>
            </div>
            <div v-else>
              <button class="btn btn-primary btn-lg" @click = "Bidding()" style="margin-right:10%">Bidding</button>
            </div>
            <div class="mb-4" style="margin-top:30px">
              <p>{{product.product_explain}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- row closed -->
      <div class="tab-style section-gap pt-0">
        <div class="container">
          <ul class="nav nav-tabs nav-tabs-bottom mb-4">
            <li class="nav-item" aria-expanded="false">
              <a
                class="nav-link active"
                aria-expanded="true"
                data-toggle="tab"
                href="#tab-1"
              >Description</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                aria-expanded="false"
                data-toggle="tab"
                href="#tab-2"
              >Specification</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-expanded="false" data-toggle="tab" href="#tab-3">Q &#38; A</a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade active show" id="tab-1" aria-expanded="true">
              <p>Super charge your walk! Easy portable effortless light weight! Swing Weights were designed to be the best, most effective walking weight on the market.Use Swing Weights as you walk for a low-impact, fully body workout.</p>
              <p class="mb-0">The dumbbell material : outside is rubber,inside is cast iron . the weigth is enough .5kg is 5kg ,10kg is 10kg .we also can make client's logo on the cover.</p>
            </div>
            <div class="tab-pane fade" id="tab-2" aria-expanded="false">
              <p class="mb-0">
                - Silver, space silver, 1.48 inch TFT LCD capacitive touch screen, 128*128 pixels Resolution; Dial- Plastic; Strap- Flexible &amp; durable
                - Bluetooth 4.0, Magnetic charging cable (2 m), Sport Band
                - Retina display with Force Touch, Sport Band with stainless steel pin, Composite back, accelerometer
              </p>
            </div>
            <div class="tab-pane fade" id="tab-3" aria-expanded="false">
              <p class="mb-0">If you are willing to buy this watch then just order it right away without any second thought. This is a watch with great tools on it. So the internals had to be pretty good. It is a watch worth every penny. I used it on a daily basis for a pretty long time and it didn't lag even once and still works like charm.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- tab-style closed -->
      <div class="related-post section-gap bg-light">
        <div class="section-title-wrapper">
          <div class="container">
            <div class="row">
              <div class="col-sm-12 col-md-6 mx-auto text-center">
                <h2>Related Products</h2>
                <p
                  class="mb-0 lead"
                >May these products are related above product.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div
              class="col-sm-12 col-md-6 col-lg-4"
              v-for="(product,index) of relative_Products"
              :key="index"
            >
              <div class="card border-0 border-rad mb-0 clickable" style="height: 500px; display: grid; grid-template-rows: 260px 200px;" >
                <a style="height:260px;display:flex; justify-content:center; align-items:center;" @click="Product_detail(product)">
                  <img
                    class="center"
                    :src="product_images[index]"
                    style="margin-top: 20px; width: auto; height: auto; max-width: 280px; max-height: 260px;"
                  />
                </a>
                <div class="card-body border-rad-bottom" style="text-align:center">
                  <a @click="Product_detail(product)">
                  <h4 class="card-title mb-2">
                    {{product.product_name}}
                  </h4>
                  <p class="card-text">{{product.product_explain}}</p>
                  <p v-if="product.product_price == 0" class="text-secondary font-weight-med font-lg mb-4">
                      무료나눔
                  </p>
                  <p v-else class="text-primary font-weight-med font-lg mb-4">
                    ${{product.product_price}}
                  </p>
                  </a>
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
                      <a class="d-flex align-content-end">
                        <i class="fa fa-calendar-o mr-2 align-self-center"></i>
                        <span class="font-sm text-capitalize">Today</span>
                      </a>
                    </div>
                  </div>
                  <div style="margin-top:10px">
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
    </div>
    <v-dialog v-model="bid_open" max-width="500px">
      <v-card>
        <v-card-text>
        <v-container>
            <div class="row mb-3">
              <div class="col-sm-12 col-md-12 m-md-b">
                  <h2 class="text-capitalize font-2x mb-4">Bidding</h2>
                  <form class="billing-form" action="javascript:void(0)" method="post">
                    <div class="col-sm-12 col-md-12">
                      <label>Bidding Price ($)</label>
                      <p>You can input more than Current Price ${{product.product_price}}</p>
                      <input type="Tel" class="form-control form-control-lg" v-model="bid_value" required />
                    </div>
                  </form>
              </div>
            </div>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text="" @click="close_bid()">Cancel</v-btn>
            <v-btn color="blue darken-1" text="" @click="save_bid()">Save</v-btn>
            
        </v-card-actions>

      </v-card>
    </v-dialog>
    <v-dialog v-model="buy_open" max-width="500px">
      <v-card>
        <v-card-text>
        <v-container>
            <div class="row mb-3">
              <div class="col-sm-12 col-md-12 m-md-b">
                  <h2 class="text-capitalize font-2x mb-4">Bidding</h2>
                  <form class="billing-form" action="javascript:void(0)" method="post">
                    <div class="col-sm-12 col-md-12">
                      <label>Buying Price ${{product.product_price}}</label>
                    </div>
                  </form>
              </div>
            </div>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text="" @click="close_buy()">Cancel</v-btn>
            <v-btn color="blue darken-1" text="" @click="buy()">Buy</v-btn>
            
        </v-card-actions>

      </v-card>
    </v-dialog>
    <!-- product wrapper closed -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: null,
      images: [],
      selected: 0,
      relative_Products: [],
      Products: null,
      product_images: [],
      isWish: [],
      isCart: [],
      Wishlist: [],
      Cart: [],
      bid_open: false,
      bid_value: 0,
      buy_open: false,
    };
  },
  created() {
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
    this.product = this.$store.getters.getProduct
    this.bid_value = this.product.product_price
    this.images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.product.productID+'%2Fthumb?alt=media')
    for(var i=0;i<this.product.len_image-1;i++)
    {
      this.images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.product.productID+'%2F'+i+'?alt=media')
    }
    if(this.Products!=null)
    {
      this.relative_Products = []
      var string_list = []
      string_list=this.product.product_name.split(' ')
      console.log(string_list)
      var cnt=0
      for(var i=0;i<this.Products.length;i++)
      {
        if(this.Products[i].productID != this.product.productID)
        {
          for(var j=0;j<string_list.length;j++)
          {
            if(this.Products[i].product_name.includes(string_list[j]))
            {
              console.log(this.Products[i])
              this.relative_Products.push(this.Products[i])
              cnt++
              if(cnt>=3) return
              break
            }
          }
        }
      }
    } 
  },
  firestore() {
    return {
      Products: this.$database.collection('Products')
    }
  },
  watch: {
    Products() {
      console.log("here")
      this.relative_Products = []
      var string_list = []
      this.product_images = []
      this.isWish = []
      this.isPush = []
      string_list=this.product.product_name.split(' ')
      console.log(string_list)
      var cnt=0
      for(var i=0;i<this.Products.length;i++)
      {
        if(this.Products[i].productID == this.product.productID) 
        {
          this.product = this.Products[i]
          continue
        }
        for(var j=0;j<string_list.length;j++)
        {
          if(this.Products[i].product_name.includes(string_list[j]))
          {
            this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
            var isPush = false
            for(var k=0;k<this.Wishlist.length;k++)
            {
              if(this.Wishlist[k]==this.Products[i].productID)
              {
                isPush = true
                this.isWish.push(true)
                break
              }
            }
            if(!isPush) this.isWish.push(false)
            isPush=false
            for(var k=0;k<this.Cart.length;k++)
            {
              if(this.Cart[k]==this.Products[i].productID)
              {
                isPush = true
                this.isCart.push(true)
                break
              }
            }
            if(!isPush) this.isCart.push(false)
            console.log(this.Products[i])
            console.log(this.relative_Products)
            this.relative_Products.push(this.Products[i])
            cnt++
            if(cnt>=3) return
            break
          }
        }
      }
    },
    Wishlist: function () {
      console.log("here")
      this.isWish=[]
      for(var i=0;i<this.relative_Products.length;i++)
      {
        var isPush = false
        for(var j=0;j<this.Wishlist.length;j++)
        {
          if(this.Wishlist[j] == this.relative_Products[i].productID)
          {
            this.isWish.push(true)
            isPush = true
            break
          }
        }
        if(isPush) continue
        this.isWish.push(false)
      }
      console.log("here?")
    },
    Cart: function () {
      console.log("here")
      this.isCart=[]
      for(var i=0;i<this.relative_Products.length;i++)
      {
        var isPush = false
        for(var j=0;j<this.Cart.length;j++)
        {
          if(this.Cart[j] == this.relative_Products[i].productID)
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
  methods: {
    buy() {
      var router = this.$router
      this.$database.collection('Products').doc(this.product.productID).set({
          state: "sold"
        }, {merge:true}).then(function () {
          alert("Buy Success!")
          router.push('product-grid')
        })
    },
    open_buy() {
      this.buy_open=true
    },
    open_buy() {
      this.buy_open=true
    },
    close_buy() {
      this.buy_open=false
    },
    Bidding() {
      this.bid_open=true
    },
    close_bid() {
      this.bid_open=false
    },
    save_bid() {
      if(parseInt(this.bid_value) > parseInt(this.product.product_price))
      {
        var close_bid = this.close_bid
        this.$database.collection('Products').doc(this.product.productID).set({
          product_price: this.bid_value,
          bid_user: this.user.userID
        }, {merge:true}).then(function () {
          alert("Bidding Successful!")
          close_bid()
        })
      }
      else{
        alert("Your bidding value is less than current price!")
      }
    },
    image_big(product) {
      window.open(this.images[this.selected])
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
      console.log("before")
      console.log(this.Wishlist)
      this.Wishlist.splice(this.Wishlist.indexOf(product.productID),1)
      console.log(this.Wishlist)
      console.log("after")
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
      console.log("before")
      console.log(this.Cart)
      this.Cart.splice(this.Cart.indexOf(product.productID),1)
      console.log(this.Cart)
      console.log("after")
      this.$database.collection("Users").doc(this.user.userID).set({
        Cart : this.Cart
      }, {merge: true}).then(function(){
      })
    },
    Product_detail(product) {
      this.$store.commit('setProduct',product)
      this.$router.go(0)
    },
    select_image(index) {
      this.selected=index
    },
    goChat() {
      var router = this.$router
      var ck = 0
      this.$store.commit('setSeller', this.product.seller)
      var db=this.$database
      var userID = this.user.userID
      var seller = this.product.seller
      this.$database.collection('Msg').doc(this.user.userID).get().then(function(doc){
        if(doc.exist) //상대방 배열이 존재
        {
          var chat_list = doc.data().users
          var isExist = false
          for(var i=0; i<chat_list.length;i++)
          {
            if(doc.data()[i]==seller)
            {
              isExist = true
              break
            }
          }
          if(isExist) {
            router.push('my-chat')
          }
          else {
            chat_list.push(seller)
            db.collection('Msg').doc(seller).get().then(function(doc2){
              var chat_list2 = []
              if(doc2.exist) {
                var chat_list2 = doc2.data().users
                chat_list2.push(userID)
                db.collection('Msg').doc(seller).set({
                  users: chat_list2
                },{merge:true}).then(function(){
                  ck++
                  if(ck==4) router.push('my-chat')
                })
              }
              else {
                chat_list2.push(userID)
                db.collection('Msg').doc(seller).set({
                  users: chat_list2
                },{merge:true}).then(function(){
                  ck++
                  if(ck==4) router.push('my-chat')
                })
              }
            })
            db.collection('Msg').doc(userID).set({
              users: chat_list
            },{merge:true}).then(function(){
              ck++
              if(ck==4) router.push('my-chat')
            })
            db.collection('Msg').doc(userID).collection(seller).add({
              message: 'Contact Success',
              type: 'join',
              time: (new Date()).toDateString()+' '+(new Date).toTimeString().slice(0,8)
            }).then(function() {
              ck++
              if(ck==4) router.push('my-chat')
            })
            db.collection('Msg').doc(seller).collection(userID).add({
              message: 'Contact Success',
              type: 'join',
              time: (new Date()).toDateString()+' '+(new Date).toTimeString().slice(0,8)
            }).then(function(){
              ck++
              if(ck==4) router.push('my-chat')
            })
          }
        }
        else
        {
          var chat_list = []
          chat_list.push(seller)
          console.log('chat_list')
          console.log(chat_list)
          db.collection('Msg').doc(userID).set({
            users: chat_list
          },{merge:true}).then(function(){
            ck++
            if(ck==4) router.push('my-chat')
          })
          db.collection('Msg').doc(seller).get().then(function(doc2){
              var chat_list2 = []
              if(doc2.exist) {
                var chat_list2 = doc2.data().users
                chat_list2.push(userID)
                db.collection('Msg').doc(seller).set({
                  users: chat_list2
                },{merge:true}).then(function(){
                  ck++
                  if(ck==4) router.push('my-chat')
                })
              }
              else {
                chat_list2.push(userID)
                db.collection('Msg').doc(seller).set({
                  users: chat_list2
                },{merge:true}).then(function(){
                  ck++
                  if(ck==4) router.push('my-chat')
                })
              }
            })
          db.collection('Msg').doc(userID).collection(seller).add({
            message: 'Contact Success',
            type: 'join',
            time: (new Date()).toDateString()+' '+(new Date).toTimeString().slice(0,8)
          }).then(function() {
            ck++
            if(ck==4) router.push('my-chat')
          })
          db.collection('Msg').doc(seller).collection(userID).add({
            message: 'Contact Success',
            type: 'join',
            time: (new Date()).toDateString()+' '+(new Date).toTimeString().slice(0,8)
          }).then(function(){
            ck++
            if(ck==4) router.push('my-chat')
          })
        }
      })
    },
  }
};
</script>
