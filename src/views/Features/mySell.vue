<template>
  <div>
    <PageTitle headerTitle="Your Selling List" headerSubTitle="You can see products that you selling or sell or sold"></PageTitle>
    <div class="product-wrapper section-gap cart-page">
      <div class="container">
				<div class="section-title-wrapper">
				<div class="row">
					<div class="col-sm-12 col-md-6">
						<h2>Your Selling List</h2>
						<p class="mb-0 lead">You have <span class="text-primary">{{SellProducts.length}}</span> selling Items</p>
					</div>
				</div>
			</div>
      <div class="cart-info">
          <div class="row">
            <div class="col-sm-12 col-md-6 ml-auto">
              <div class="bg-light py-4 px-3">
                <div class="block">
                  <router-link
                    to="/product-add"
                    class="btn btn-primary submit-btn btn-block btn-lg"
                  >Add Product to sell</router-link>
                  <a
                    @click="cal()"
                    class="btn btn-success submit-btn btn-block btn-lg"
                  >Calculate Cart, Wish</a>
                </div>
              </div>
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
                <th>Number Of Wishlist</th>
                <th>Number Of Cart</th>
                <th>State</th>
					      <th>Action</th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="(product,index) in SellProducts" :key="index" @click="goDetail(product)">
                <td class="w-20 text-center">
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
                <td>{{product.product_name}}</td>
                <td>${{product.product_price}} <p v-if="product.isAuction && (product.state!='sold')">(changing)</p> 
                  <p v-if="product.bid_user"> Now Bid user : {{product.bid_user}}</p>
                </td>
                <td>
                  {{product.num_wish}}
                </td>
                <td>
                  {{product.num_cart}}
                </td>
                <td>
                  {{product.state}}
                </td>
                <td class="w-20 text-center position-relative">
                  <a style="margin-right:15%" @click="open_edit(product)">
                    <i class="mdi mdi-square-edit-outline mdi-36px"></i>
                  </a>
                  <a @click="product_delete(product)">
                    <i class="mdi mdi-delete mdi-36px"></i>
                  </a>
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
    <v-dialog v-model="edit_dialog" max-width="500px">
      <v-card>
        <v-card-text>
        <v-container>
            <div class="row">
              <div>
                  <h2 class="text-capitalize font-2x mb-4">Product Information</h2>
                  </div>
                  <div class="form-group" style="width:100%">
                    <label for="InputEmail1">Product name</label>
                    <input
                      class="form-control form-control-lg"
                      v-model="product_name"
                      required
                    />
                  </div>
                  <div v-if="!isAuction" class="form-group" style="width:100%">
                    <label for="InputEmail1">Price ($)</label>
                    <input
                      class="form-control form-control-lg"
                      v-model="product_price"
                      type="number"
                      placeholder="If you want to give this item free, input 0"
                      required
                    />
                  </div>
                  <div class="form-group" style="width:100%">
                    <label for="InputEmail1">How to sell</label>
                    <select class="form-control form-control-md" v-model="how_to_sell">
                      <option disabled>Select Way</option>
                      <option>Direct transaction</option>
                      <option>Deposit and delivery</option>
                      <option>Direct transaction or deposit and delivery</option>
                    </select>
                  </div>
                  <div class="form-group" style="width:100%">
                    <label for="InputEmail1">Product Description</label>
                    <v-textarea
                      solo
                      label="Product Description"
                      v-model="product_explain"
                    ></v-textarea>
                  </div>
            </div>
        </v-container>
        </v-card-text>

        <v-card-actions>
        <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text="" @click="close_edit()">Cancel</v-btn>
            <v-btn color="blue darken-1" text="" @click="save()">Save</v-btn>
            
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
      user: null,
      password: null,
      product_images: [],
      Products: null,
      Wishlist: [],
      WishProducts: [],
      isWish: [],
      total: 0,
      Sell: [],
      SellProducts: [],
      edit_dialog:false,
      product_name: "",
      how_to_sell: "",
      product_price: 0,
      product_explain: "",
      selected_product: null,
      isAuction: false,
    };
  },
  mounted() {
    this.user = this.$store.getters.getUser
    if(this.user) this.Sell = this.user.Sell
  },
  firestore() {
    return {
      Products: this.$database.collection('Products'),
      Users: this.$database.collection('Users')
    }
  },
  methods: {
    cal(product,index) {
      for(var i=0;i<this.SellProducts.length;i++)
      {
        this.SellProducts[i].num_wish = 0
        for(var j=0;j<this.Users.length;j++)
        {
          for(var k=0;k<this.Users[j].Wishlist.length;k++)
          {
            if(this.Users[j].Wishlist[k]==this.SellProducts[i].productID) this.SellProducts[i].num_wish = this.SellProducts[i].num_wish+1
          }
        }
      }
      for(var i=0;i<this.SellProducts.length;i++)
      {
        this.SellProducts[i].num_cart = 0
        for(var j=0;j<this.Users.length;j++)
        {
          for(var k=0;k<this.Users[j].Cart.length;k++)
          {
            if(this.Users[j].Cart[k]==this.SellProducts[i].productID) this.SellProducts[i].num_cart = this.SellProducts[i].num_cart+1
          }
        }
      }
      for(var i=0;i<this.SellProducts.length;i++)
      {
        this.$database.collection('Products').doc(this.SellProducts[i].productID).set({
          num_wish: this.SellProducts[i].num_wish,
          num_cart: this.SellProducts[i].num_cart
        },{merge:true})
      }
    },
    save() {
      var close_edit = this.close_edit
      this.$database.collection('Products').doc(this.selected_product.productID).set({
        product_name : this.product_name,
        product_price : this.product_price,
        product_explain : this.product_explain,
        how_to_sell : this.how_to_sell
      }, {merge:true}).then(function(){
        alert("Update Success!")
        close_edit()
      })
    },
    Product_detail(product) {
      this.$store.commit('setProduct',product)
      this.$router.push('product-detail')
    },
    goDetail(product){
      console.log(product)
    },
    open_edit(product){
      this.edit_dialog=true
      this.selected_product = product
      this.product_name = product.product_name
      this.product_price = product.product_price
      this.product_explain = product.product_explain
      this.how_to_sell = product.how_to_sell
      this.isAuction = product.isAuction
    },
    close_edit(){
      this.edit_dialog=false
    },
    product_edit(product) {
    },
    product_delete(product) {
      this.$database.collection("Products").doc(product.productID).delete().then(function() {
        alert("Delete End")
      })
    }
  },
  watch: {
    Products: function () {
      this.product_images = []
      this.SellProducts = []
      for(var i=0;i<this.Products.length;i++)
      {
        for(var j=0;j<this.Sell.length;j++)
        {
          if(this.Sell[j] == this.Products[i].productID)
          {
            this.SellProducts.push(this.Products[i])
            this.product_images.push('https://firebasestorage.googleapis.com/v0/b/web-project-4f3bd.appspot.com/o/images%2F'+this.Products[i].productID+'%2Fthumb?alt=media')
            break
          }
        }
      }
    },
  }
};
</script>
