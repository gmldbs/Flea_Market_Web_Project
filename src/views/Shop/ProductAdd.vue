<template>

  <div>
    <PageTitle
      headerTitle="Product Add"
      headerSubTitle="You can upload the product with this description and images"
    ></PageTitle>
    <div class="product-wrapper section-gap pb-0">
      <div class="container">
        <div class="row mb-4">
          <div class="col-sm-12 col-md-12 col-lg-5">
            <div class="mb-4">
              <div class="feature-box-thumb">
                <img v-if="imageUrl" :src="imageUrl[selected]" class="img-fluid card-shadow" alt="product image" />
                <img v-else src="static/img/2.jpg" class="img-fluid card-shadow" alt="product image" />
              </div>
            </div>
            <div class>
              <ul class="list-unstyled p-gallary-thumb list-p-detail row">
                <li v-for="(image,index) in imageUrl" :key="index" class="col-6 col-sm-3 col-md-3 mb-4">
                  <img :src="image" class="img-fluid" alt="product image" @click="select_thumbnail(index)"/>
                </li>
                <li v-if="imageUrl==null" class="col-6 col-sm-3 col-md-3 mb-4">
                  <a href="javascript:void(0);">
                    <img src="static/img/2.jpg" class="img-fluid" alt="product image" />
                  </a>
                </li>
                <li v-if="imageUrl==null" class="col-6 col-sm-3 col-md-3 mb-4">
                  <a href="javascript:void(0);">
                    <img src="static/img/2.jpg" class="img-fluid" alt="product image" />
                  </a>
                </li>
                <li v-if="imageUrl==null" class="col-6 col-sm-3 col-md-3 mb-4">
                  <a href="javascript:void(0);">
                    <img src="static/img/2.jpg" class="img-fluid" alt="product image" />
                  </a>
                </li>
                <li v-if="imageUrl==null" class="col-6 col-sm-3 col-md-3 mb-4">
                  <a href="javascript:void(0);">
                    <img src="static/img/2.jpg" class="img-fluid" alt="product image" />
                  </a>
                </li>
              </ul>
              <v-btn
                style="width:100%"
                dark
                @click.native="selectFile"
                v-if="imageUrl">
                  Reselect Images
              </v-btn>
              <v-btn
                style="width:100%"
                dark
                @click.native="selectFile"
                v-else>
                  Select Images
              </v-btn>
              <form ref="form">
                <input
                id="files"
                type="file"
                name="file"
                ref="uploadInput"
                accept="image/*"
                :multiple="true"
                @change="detectFiles($event)" />
              </form>
              <p>You can choose thumbnail image to click image!</p>
                <!--div v-if="fileList">
                  <v-btn
                    class="ma-0"
                    dark
                    small
                    color="error"
                    @click="upload()"
                    >
                    Upload
                  </v-btn>
                </div-->
            </div>
          </div>
           <div class="col-sm-12 col-md-7 py-4">
              <div class="card border-0 p-5 card-shadow">
                <form class="session-form mb-4" action="javascript:void(0)" method="post">
                  <div class="social-widget mb-4">
                    <h2 class="text-capitalize font-2x mb-4">Product Information</h2>
                  </div>
                  <!-- Social widget closed -->
                  <div class="form-group">
                    <label for="InputEmail1">Product name</label>
                    <input
                      class="form-control form-control-lg"
                      v-model="product_name"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <v-checkbox
                      v-model="isAuction"
                      label="isAuction"
                      color="indigo"
                      hide-details
                    ></v-checkbox>
                  </div>
                  <div v-if="!isAuction" class="form-group">
                    <label for="InputEmail1">Price ($)</label>
                    <input
                      class="form-control form-control-lg"
                      v-model="product_price"
                      type="number"
                      placeholder="If you want to give this item free, input 0"
                      required
                    />
                  </div>
                  <div v-if="isAuction" class="form-group">
                    <label for="InputEmail1">Start Price ($)</label>
                    <input
                      class="form-control form-control-lg"
                      v-model="product_price"
                      type="number"
                      placeholder="Input Start Auction Price"
                      required
                    />
                  </div>
                  <div v-if="isAuction" class="form-group" style="text-align:center">
                    <label for="InputEmail1">Set Auction End Date</label>
                    <div style="display: grid; grid-template-columns: 45% 50%; grid-gap:5%">
                      <v-date-picker width="100%" v-model="date"></v-date-picker>
                      <v-time-picker width="100%" v-model="time"></v-time-picker>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="InputEmail1">How to sell</label>
                    <select class="form-control form-control-md" v-model="how_to_sell">
                      <option disabled>Select Way</option>
                      <option>Direct transaction</option>
                      <option>Deposit and delivery</option>
                      <option>Direct transaction or deposit and delivery</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="InputEmail1">Product Description</label>
                    <v-textarea
                      solo
                      label="Product Description"
                      v-model="product_explain"
                    ></v-textarea>
                  </div>
                  
                  <div class="form-group">
                    <button
                      v-if="!isLoad"
                      type="submit"
                      class="btn btn-secondary btn-block btn-lg submit-btn"
                      @click="product_add()"
                    >Product Upload</button>
                    <v-btn v-else loading class="btn btn-secondary btn-block btn-lg submit-btn"></v-btn>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
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
              <a class="nav-link" aria-expanded="false" data-toggle="tab" href="#tab-3">Reviews</a>
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
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isAuction: false,
      product_explain: '',
      product_name: '',
      product_price: '',
      how_to_sell: 'Select Way',
      progressUpload: 0,
      fileName: null,
      uploadTask: null,
      uploading: false,
      uploadEnd: 0,
      downloadURL: '',
      fileList : null,
      imageUrl : null,
      allEnd : false,
      selected: 0,
      user: null,
      date: "",
      time: new Date(),
      isLoad: false
    }
  },
  mounted() {
    this.user = this.$store.getters.getUser
  },
  computed: {
    submittableDateTime() {
      const date = new Date(this.date)
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      console.log(date)
      return date
    }
  },
  methods: {
    product_add () {
      this.isLoad=true
      if(this.user == null)
      {
        alert("Login first!")
        this.isLoad=false
        return
      }
      if(this.fileList==null)
      {
        alert("Select the image!")
        this.isLoad=false
        return
      }
      if(this.how_to_sell=='Select Way' || this.product_name=='' || this.product_price=='' || this.product_explain=='')
      {
        alert("Fill all blank!")
        this.isLoad=false
        return
      }
      if(this.isAuction)
      {
        if(this.date == "" || this.time == "")
        {
          alert("Select Auction End time!")
          this.isLoad=false
          return
        }
      }
      var upload_func = this.upload
      var db = this.$database
      var userID = this.user.userID
      var store = this.$store
      var user = this.user
      var cS = this.changeState
      db.collection('Products').add({
        product_name: this.product_name,
        product_price: this.product_price,
        how_to_sell: this.how_to_sell,
        len_image: this.fileList.length,
        seller: this.user.userID,
        product_explain: this.product_explain,
        Auction_date: this.isAuction ? this.submittableDateTime : new Date(),
        isAuction: this.isAuction,
        state: "post"
      })
      .then(function(docRef) {
        upload_func(docRef)
        db.collection('Products').doc(docRef.id).set({
          productID : docRef.id
        }, { merge: true })
        user.Sell.push(docRef.id)
        store.commit('setUser',user)
        db.collection('Users').doc(userID).set({
          Sell: user.Sell,
          type: 'Seller'
        },{merge:true})
      })
      .catch(function(error) {
          alert("Error required")
          cS()
          console.log(error)
      });
    },
    changeState(){
      this.isLoad = false
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      this.fileList=fileList
      this.imageUrl = []
      for(var i=0;i<fileList.length;i++)
      {
        this.imageUrl.push(URL.createObjectURL(fileList[i]))
      }
    },
    upload (doc) {
      this.uploadTask = []
      this.uploadEnd = 0
      var n = 0
      Array.from(Array(this.fileList.length).keys()).map(x => {
        var image_name = ''
        if(x==this.selected) image_name = 'images/' + doc.id+'/thumb'
        else {
          image_name = 'images/' + doc.id+'/'+n
          n++
        }
        this.uploadTask.push(this.$fireStorage.ref(image_name).put(this.fileList[x]))
      })
      console.log(this.uploadTask)
    },
    select_thumbnail (index) {
      this.selected = index
    }
  },
  watch: {
    uploadTask: function () {
      this.progressUpload = []
      var uploadEnd=0
      var upload_length = this.fileList.length;
      var router = this.$router
      for(var i=0;i<this.uploadTask.length;i++)
      {
        this.uploadTask[i].on('state_changed', function(snapshot){
          
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          uploadEnd++
          if(uploadEnd == upload_length) 
          {
            alert("upload Finish!")
            router.go(-1)
          }
        });
      }
    },
  }
}
</script>

<style>
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
</style>