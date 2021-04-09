<template>
  <v-app id="app" class="v-content__wrap">
    <Header/>
    <router-view/>
    <Footer/>
  </v-app>
</template>
<script>
  import Header from'@/components/Header/Header'
  import Footer from'@/components/Footer/Footer'

  export default{
    data(){
      return{
  		  showHeaderAndFooter: true,
      //   showFooterSlider: true
      }
    },
    components:{
      Header,
		  Footer,
    },
    methods: {
      getUrl(){
        let val = this.$route.path.split("/");
        if(val[1] == 'login' || val[1] == 'sign-up' || val[1] == 'thank-you' || val[1] == 'maintenance' || val[1] == 'not-found')
        {
            this.showHeaderAndFooter = false;
            this.showFooterSlider = false;
        } else {
            this.showHeaderAndFooter = true;               
            this.showFooterSlider = true;
        }
  		},
    },
    mounted(){
		  this.getUrl();		
    },
    watch: {
      $route() {
		    this.getUrl();				  
      }
    },
  }
</script>