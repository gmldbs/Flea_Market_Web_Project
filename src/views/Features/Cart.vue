<template>
  <div>
    <PageTitle headerTitle="Your Cart!" headerSubTitle="You can see products that you choose"></PageTitle>
    <div class="product-wrapper section-gap cart-page">
      <div class="container">
				<div class="section-title-wrapper">
				<div class="row">
					<div class="col-sm-12 col-md-6">
						<h2>Your Cart</h2>
						<p class="mb-0 lead">You have <span class="text-primary">{{CartProducts.length}}</span> Items in your Cart</p>
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
              <tr v-for="(product,index) in CartProducts" :key="index" @click="goDetail(product)">
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
                    @click="remove_cart(product)"
                  >
                    <span aria-hidden="true">
                      <i class="fa fa-trash"></i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- table responsive closed -->
        <div class="cart-info">
          <div class="row">
            <div class="col-sm-12 col-md-6 ml-auto">
              <div class="bg-light py-4 px-3">
                <h2 class="font-26 mb-4">Cart Totals</h2>
                <table class="table">
                  <tbody>
                    <tr class="border-bottom font-weight-bold">
                      <td>Total</td>
                      <td>$ {{total}}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="block">
                  <a class="btn btn-primary submit-btn btn-block btn-lg" style="color:white" @click="buyAll()">Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      Cart: [],
      CartProducts: [],
      isCart: [],
      total: 0
    };
  },
  mounted() {
    this.user = this.$store.getters.getUser
    if(this.user) this.Cart = this.user.Cart
    console.log(this.Cart)
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
    remove_cart(product) {
      if(this.user == null) 
      {
        alert("You can add this product to your Cartlist after login.")
        return
      }
      this.Cart.splice(this.Cart.indexOf(product),1)
      this.$database.collection("Users").doc(this.user.userID).set({
        Cart : this.Cart
      }, {merge: true})
    },
    goDetail(product){
      console.log(product)
    },
    buyAll() {
      var cnt=0
      var len=0
      var user = this.user
      var store = this.$store
      var router = this.$router
      var database = this.$database
      for(var i=0;i<this.CartProducts.length;i++)
      {
        if(!this.CartProducts[i].isAuction) len++
      }
      for(var i=0;i<this.CartProducts.length;i++)
      {
        if(!this.CartProducts[i].isAuction) {
          this.$database.collection("Products").doc(this.CartProducts[i].productID).set({
            state : "sold"
          },{merge:true}).then(function() {
            cnt++
            if(cnt>=len)
            {
              database.collection("Users").doc(user.userID).set({
                cart : []
              },{merge:true}).then(function(){
                user.Cart = []
                store.commit('setUser',user)
                alert("Buy All Products in cart Success!")
                router.push('home')
              })
            }
          })
        }
      }
      
    }
  },
  watch: {
    Products: function () {
      this.product_images = []
      this.CartProducts = []
      this.total=0
      for(var i=0;i<this.Products.length;i++)
      {
        for(var j=0;j<this.Cart.length;j++)
        {
          if(this.Cart[j] == this.Products[i].productID)
          {
            
            this.CartProducts.push(this.Products[i])
            this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
            console.log(this.Products[i].isAuction)
            if(!this.Products[i].isAuction) this.total+=parseInt(this.Products[i].product_price)
            break
          }
        }
      }
    },
    Cart: function () {
      this.product_images = []
      this.CartProducts = []
      this.total=0
      for(var i=0;i<this.Products.length;i++)
      {
        for(var j=0;j<this.Cart.length;j++)
        {
          if(this.Cart[j] == this.Products[i].productID)
          {
            this.CartProducts.push(this.Products[i])
            this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
            if(!this.Products[i].isAuction) this.total+=parseInt(this.Products[i].product_price)
            break
          }
        }
      }
    },
  }
};
</script>