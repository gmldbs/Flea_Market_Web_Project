<template>
   <div>
      <PageTitle
         headerTitle="Your Information"
         headerSubTitle="You can change your information except your id and nickname."
      >
      </PageTitle>
      <div class="product-wrapper section-gap">
         <div class="container">
            <div class="row mb-3">
               <div class="col-sm-12 col-md-12 m-md-b">
                  <h2 class="text-capitalize font-2x mb-4">My Information</h2>
                  <form class="billing-form" action="javascript:void(0)" method="post">
                     <div class="form-group row">
                        <div class="col-sm-12 col-md-6 m-xs-b">
                           <label>User ID<sup class="font-lg ml-1 align-bottom">*</sup></label>
                           <input type="text" class="form-control form-control-lg" v-model="user.userID" disabled />
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Nick Name</label><sup class="font-lg ml-1 align-bottom">*</sup>
                           <input type="text" class="form-control form-control-lg" v-model="user.nickname" disabled />
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Password</label>
                           <input type="text" class="form-control form-control-lg" v-model="password" placeholder="Input new password if you want to change" />
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Confirm Password</label>
                           <input type="text" class="form-control form-control-lg" v-model="confirm_password" placeholder="Confirm new password" required />
                        </div>
                     </div>
                     <div class="form-group">
                        <label>Company Name</label>
                        <input type="text" class="form-control form-control-lg" placeholder="Company Name" v-model="company" required />
                     </div>
                     <div class="form-group row">
                        <div class="col-sm-12 col-md-6">
                           <label>Email Address</label>
                           <input type="Email" class="form-control form-control-lg" placeholder="Email Address" v-model="email" required />
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Phone</label>
                           <input type="Tel" class="form-control form-control-lg" placeholder="Phone Number" v-model="phone" required />
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
                           <input type="text" class="form-control form-control-lg" placeholder="City" v-model="city" required />
                        </div>
                        <div class="col-sm-12 col-md-6">
                           <label>Postal Code</label>
                           <input type="text" class="form-control form-control-lg" placeholder="Postal Code" v-model="postal" required />
                        </div>
                     </div>
                  </form>
                  <a class="btn btn-primary" @click="change_info()" style="color:white; margin-bottom:10px">Save</a>
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
      user: null,
      isChange: false,
      password: null,
      confirm_password: null,
      company: null,
      email: null,
      phone: null,
      country: null,
      address: null,
      city: null,
      postal: null,
    };
  },
  created() {
    this.user = this.$store.getters.getUser
    this.company = this.user.password ? this.user.password : null
    this.email = this.user.email ? this.user.email : null
    this.phone = this.user.phone ? this.user.phone : null
    this.country = this.user.country ? this.user.country : null
    this.address = this.user.address ? this.user.address : null
    this.city = this.user.city ? this.user.city : null
    this.postal = this.user.postal ? this.user.postal : null
  },
  methods: {
     change_info(){
      if(!this.isChange) {
         alert("not changed!")
         return
      }
      this.$database.collection("Users").doc(this.user.userID).set({
         password: this.password ? (this.password == this.confirm_password ? this.password : this.user.password) : this.user.password,
         company: this.company,
         email: this.email,
         phone: this.phone,
         country: this.country,
         address: this.address,
         city: this.city,
         postal: this.postal
      }, {merge: true})
      var new_user = {
         userID: this.user.userID,
         nickname: this.user.nickname,
         password: this.password ? (this.password == this.confirm_password ? this.password : this.user.password) : this.user.password,
         company: this.company,
         email: this.email,
         phone: this.phone,
         country: this.country,
         address: this.address,
         city: this.city,
         postal: this.postal
      }
      this.$store.commit('setUser',new_user)
      alert("changed!")
     }
  },
  watch: {
   user: function () {
      this.isChange = true
   },
  }
};
</script>
