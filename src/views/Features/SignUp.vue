<template>
   <div>
      <PageTitle
         headerTitle="Sign UP!"
         headerSubTitle="Sign Up and let's enjoy our mall!"
      >
      </PageTitle>
      <div class="product-wrapper section-gap">
         <div class="container">
            <div class="row mb-3">
               <div class="col-sm-12 col-md-12 m-md-b">
                  <h2 class="text-capitalize font-2x mb-4">Registeration</h2>
                  <p>Parts marked with * are required.</p>
                  <form class="billing-form" action="javascript:void(0)" method="post">
                     <div class="form-group row">
                        <div class="col-sm-12 col-md-6 m-xs-b">
                           <label>User ID<sup class="font-lg ml-1 align-bottom">*</sup></label>
                           <input type="text" placeholder="Input unique User ID" class="form-control form-control-lg" v-model="userID" required/>
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Nick Name</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="text" placeholder="Input nickname" class="form-control form-control-lg" v-model="nickname" required/>
                        </div>
                        <div class="col-sm-12 col-md-6 m-xs-b">
                           <label>First Name<sup class="font-lg ml-1 align-bottom">*</sup></label>
                           <input type="text" placeholder="Input your Real first name" class="form-control form-control-lg" v-model="first_name" required/>
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Last Name</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="text" placeholder="Input your Real last name" class="form-control form-control-lg" v-model="last_name" required/>
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Password</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Input new password if you want to change" required/>
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Confirm Password</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="password" class="form-control form-control-lg" v-model="confirm_password" placeholder="Confirm new password" required />
                        </div>
                     </div>
                     <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" class="form-control form-control-lg" placeholder="Company Name" v-model="company"/>
                     </div>
                     <div class="form-group row">
                        <div class="col-sm-12 col-md-6">
                           <label>Email Address</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="Email" class="form-control form-control-lg" placeholder="Email Address" v-model="email" required/>
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Phone</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="Tel" class="form-control form-control-lg" placeholder="Phone Number" v-model="phone" required/>
                        </div>
                     </div>
                     <div class="form-group">
                        <label>Country</label>
                        <input type="text" class="form-control form-control-lg" placeholder="Country" v-model="country"/>
                     </div>
                     <div class="form-group">
                        <label>Address</label>
                        <input type="text" class="form-control form-control-lg" placeholder="Address" v-model="address"/>
                     </div>
                     <div class="form-group row">
                        <div class="col-sm-12 col-md-6">
                           <label>Town/City</label>
                           <input type="text" class="form-control form-control-lg" placeholder="City" v-model="city"/>
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Postal Code</label>
                           <input type="text" class="form-control form-control-lg" placeholder="Postal Code" v-model="postal"/>
                        </div>
                     </div>
                  </form>
                  <a class="btn btn-primary" type="submit" @click="SignUp()" style="color:white; margin-bottom:10px">Sign Up</a>
               </div>
            </div><!-- row closed -->
         </div><!-- container closed -->
      </div><!-- product wrapper closed -->
   </div>   
</template>
<script>
export default {
  data() {
    return {
      userID: "",
      password: "",
      nickname: "",
      confirm_password: "",
      company: "",
      email: "",
      phone: "",
      country: "",
      address: "",
      city: "",
      postal: "",
      first_name: "",
      last_name: "",
    };
  },
  methods: {
     SignUp(){
      if(this.userID == "" || this.password == "" || this.confirm_password == "" || this.first_name == "" || this.last_name == "" || this.phone == "" || this.email == "" || this.nickname == "")
      {
        alert("Fill all parts with *")
        return
      }
      if(this.password != this.confirm_password)
      {
        alert("Password is not equal to confirm_password!")
        return
      }
      var new_user = {
        userID: this.userID,
        nickname: this.nickname,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name,
        company: this.company,
        email: this.email,
        phone: this.phone,
        country: this.country,
        address: this.address,
        city: this.city,
        postal: this.postal,
        Wishlist: [],
        Cart: [],
        Sell: [],
        star: 0,
        type: "Buyer"
      }
      var db = this.$database
      var store =this.$store
      var router = this.$router
      var userID = this.userID
      this.$database.collection("Users").doc(this.userID).get().then(function(doc){
        if(doc.exist) {
          alert("this User ID is used")
        }
        else {
          db.collection("Users").doc(userID).set(new_user).then(function(doc){
            alert("Sign Up Success!")
            store.commit('setUser',new_user)
            router.push('home')
          })
        }
      })
     }
  },
};
</script>