<template>
  <div>
    <PageTitle headerTitle="Your Wish List" headerSubTitle="You can see products that you choose"></PageTitle>
    <div class="product-wrapper section-gap cart-page">
      <div class="container">
				<div class="section-title-wrapper">
				<div class="row">
					<div class="col-sm-12 col-md-6">
						<h2>Your Wish List</h2>
						<p class="mb-0 lead">You have <span class="text-primary">{{WishProducts.length}}</span> Items in your Wish list</p>
					</div>
				</div>
			</div> 
        <div class="table-responsive mb-5">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Products</th>
                <th>Price</th>
					       <th></th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="(product,index) in WishProducts" :key="index" @click="goDetail(product)">
                <td class="w-20 text-center" @click="Product_detail(product)">
                  <div class="p-img">
                    <img
                      :src="product_images[index]"
                      alt="product image"
                      class="img-fluid card-shadow"
                      width="80"
                      height="80"
                    />
                  </div>
                </td>
                <td @click="Product_detail(product)">{{product.product_name}}</td>
                <td @click="Product_detail(product)">${{product.product_price}}</td>
                <td class="w-20 text-center position-relative">
                  <button
                    type="button"
                    class="close-btn bg-transparent border-0 font-2x"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <i v-if="isCart[index]" class="mdi mdi-cart mdi-36px" @click="remove_cart(product)"></i>
                    <i v-else class="mdi mdi-cart-outline mdi-36px" @click="add_cart(product)"></i>
                  </button>
                  <button
                    type="button"
                    class="close-btn bg-transparent border-0 font-2x"
                    data-dismiss="alert"
                    aria-label="Close"
                    @click="remove_wish(product)"
                    style="margin-left:20%"
                  >
                    <span aria-hidden="true">
                      <i class="mdi mdi-delete mdi-36px"></i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- table responsive closed -->
        <!-- cart info closed -->
      </div>
      <!--container closed -->
    </div>
    <!-- product wrapper closed -->
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
      WishProducts: [],
      isWish: [],
      Cart: [],
      isCart: [],
      total: 0
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
      Products: this.$database.collection('Products')
    }
  },
  methods: {
    Product_detail(product) {
      this.$store.commit('setProduct',product)
      this.$router.push('product-detail')
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
    goDetail(product){
      console.log(product)
    }
  },
  watch: {
    Products: function () {
      this.product_images = []
      this.WishProducts = []
      for(var i=0;i<this.Products.length;i++)
      {
        for(var j=0;j<this.Wishlist.length;j++)
        {
          if(this.Wishlist[j] == this.Products[i].productID)
          {
            this.WishProducts.push(this.Products[i])
            this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
            this.total+=parseInt(this.Products[i].product_price)
            break
          }
        }
      }
    },
    Wishlist: function () {
      this.product_images = []
      this.WishProducts = []
      for(var i=0;i<this.Products.length;i++)
      {
        for(var j=0;j<this.Wishlist.length;j++)
        {
          if(this.Wishlist[j] == this.Products[i].productID)
          {
            this.WishProducts.push(this.Products[i])
            this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
            this.total+=parseInt(this.Products[i].product_price)
            break
          }
        }
      }
    },
    Cart: function () {
      console.log("here")
      this.isCart=[]
      for(var i=0;i<this.Wishlist.length;i++)
      {
        var isPush = false
        for(var j=0;j<this.Cart.length;j++)
        {
          if(this.Cart[j] == this.Wishlist[i])
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
  }
};
</script>
