<template>
   <!--  Top menu -->
   <nav 
      id="mainNav" 
      class="navbar navbar-expand-md navbar-dark fixed-top"
      style="height:100px"
      >      
      <div class="container">
         <router-link class="navbar-brand" to="/home" routerLinkActive="active-link">
            <img src="/static/img/skku_logo.png" class="img-fluid" width="110" height="37">
         </router-link>
         <button 
            class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
            <i class="fa fa-bars" style="color:black"></i>
         </button>

         <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul id="main" class="navbar-nav ml-auto main-menu list-unstyled">
               <li 
                  @click="menuToggleLink('menuNo'+i);" 
                  class="parent nav-item"
                  v-for="(menuItem,i) in menuItems"
                  :id="'menuNo'+i"
                  :key="i"
                  >
                  <router-link 
                     class="nav-link"
                     :to="menuItem.state"
                     v-if="menuItem.type == 'link'"
                     style="color:black"
                     @click.native="removeCollapseInClass();"
                  >
                     {{ menuItem.name }}
                  </router-link>
                  
                  <a
                     v-if="menuItem.type == 'sub' && i==3"
                     class="nav-link" 
                     style="color:black"
                     href="javascript:void(0)"
                  >
                  <i class="fa fa-user"></i>
                  &nbsp;{{ menuItem.name }}&nbsp;
                  <i :class="menuItem.icon" @click.stop="menuToggle('menuNo'+i)"></i>
                  </a>
                  <a
                     v-if="menuItem.type == 'sub' && i!=3"
                     class="nav-link" 
                     style="color:black"
                     href="javascript:void(0)"  
                  >
                     {{ menuItem.name }}&nbsp;
                     <i :class="menuItem.icon" @click.stop="menuToggle('menuNo'+i)"></i>
                  </a>
                  <ul 
                     v-if="menuItem.type == 'sub' && menuItem.children" 
                     class="sub-menu arrow-up list-unstyled" >
                     <li 
                        class="nav-item" 
                        v-for="(grandchildItem,i) of menuItem.children"
                        :key="i"
                        >
                        <router-link 
                           class="nav-link"
                           :to="grandchildItem.state"
                           v-if="grandchildItem.type == 'link'" 
                           @click.native="removeCollapseInClass()"      
                        >
                           {{ grandchildItem.name }}
                        </router-link>
                        <a 
                           class="nav-link" 
                           :to="grandchildItem.state"
                           v-if="grandchildItem.type == 'func'" 
                           @click="logout()"      
                        >
                           {{ grandchildItem.name }}
                        </a>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </div>
   </nav>
</template>
<script>
   export default{
      data(){
         return{
            searchactive:false,
            userID:null,
            nickname:null,
            keyword: "",
            isuser: false,
         }
      },
      mounted(){
         this.onScrollEvent();
      },
      computed: {
         isUser () {
            if(this.$store.getters.getUser) {
               this.isuser=true
               this.userID = this.$store.getters.getUser.userID
               this.nickname = this.$store.getters.getUser.nickname
               return true
            }
            else return false
         },
         isAdmin() {
            if(this.$store.getters.getUser) {
               if(this.$store.getters.getUser.isAdmin==true) 
               {
                  this.userID = this.$store.getters.getUser.userID
                  this.nickname = this.$store.getters.getUser.nickname
                  return true
               }
               else return false
            }
            else return false
         },
         menuItems () {
            if(this.isAdmin) {
               return [
               {
                  state: "/home",
                  name: "Home",
                  type:"link"
               },
               {
                  state: "/explain",
                  name: "About",
                  type: "link"
               },
               {
                  state:"product-grid",
                  name:"Products",
                  type:"link"
               },
               {
               state:"",
                  name: this.nickname,
                  type:"sub",
                  icon: 'fa fa-caret-down',
                  children: [
                     { state: 'logout', name:'logout ', type:"func"},
                     { state: 'manage-user', name: 'Manage User', type:"link"},
                  ]
               }
            ]
            }
            else if(this.isUser) {
               return [
               {
                  state: "/home",
                  name: "Home",
                  type:"link"
               },
               {
                  state: "/explain",
                  name: "About",
                  type: "link"
               },
               {
                  state:"product-grid",
                  name:"Products",
                  type:"link"
               },
               {
               state:"",
                  name: this.nickname,
                  type:"sub",
                  icon: 'fa fa-caret-down',
                  children: [
                     { state: 'logout', name:'logout ', type:"func"},
                     { state: 'my-wishlist', name: 'Wish List', type:"link"},
                     { state: 'cart', name: 'Cart', type:"link"},
                     { state: 'my-page', name: 'Mypage', type:"link"},
                     { state: 'my-sell', name: 'My Sell Page', type:"link"},
                     { state: 'my-chat', name: 'Chat Page', type:"link"},
                  ]
               }
            ]
            }
            else {
               return [
               {
                  state: "/home",
                  name: "Home",
                  type:"link"
               },
               {
                  state: "/explain",
                  name: "About",
                  type: "link"
               },
               {
                  state:"product-grid",
                  name:"Products",
                  type:"link"
               },
               {
                  state:"",
                  name:"Session",
                  type:"sub",
                  icon: 'fa fa-caret-down',
                  children: [
                     { state: 'login', name:'Login', type:"link"},
                     { state: 'sign-up', name: 'Sign Up', type:"link"},
                  ]
               }
            ]
            }
         }
      },
      methods:{
         logout(){
            this.$store.commit('setUser',null)
            this.$router.go(0)
         },
         showSearch(){
            this.searchactive = !this.searchactive;
         },
         menuToggleLink(id){
            if (document.getElementById(id).classList.contains("open")){
               document.getElementById(id).classList.remove("open");
            } else if(!document.getElementById(id).classList.contains("open")) {
               let elements = document.querySelectorAll(".parent");
               for (var i = 0; i < elements.length; i++) {
                  elements[i].classList.remove('open');
               }
               document.getElementById(id).classList.add("open");
            }   
         },
         removeCollapseInClass(){
            document.getElementById("navbarCollapse").classList.remove('show');
         },
         onScrollEvent(){
            var headerSticky = document.getElementById('mainNav');
            window.onscroll = function() {
               if (window.pageYOffset >= 100) {
                  headerSticky.classList.add("scrollHeader");
               }  else {
                  headerSticky.classList.remove("scrollHeader");
               }
            }
         },
         search(){
            this.$store.commit('setKeyword',this.keyword)
            this.$router.push('product-grid')
            this.searchactive = !this.searchactive
         }
      }
   }
</script>
<style>
   .scrollHeader{
      background-color: #ffffff;
   }
</style>