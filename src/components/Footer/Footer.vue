<template>
   <div>
      <div class="footer-wrapper-2 py-6">
         <div class="container container-full-width text-center">
            <div class="row align-items-center">
               <ul class="list-unstyled">
                  <li v-for="(contactUs,i) of data" :key="i" class="mb-4">
                     <div class="d-flex">
                        <span class="d-inline-block chk-icon-head"> <i :class="contactUs.img" class="fa-2x "></i></span>
                        <div class="px-3 chk-icon-desp">
                           <a href="javascript:void(0)" class="text-white font-20">{{contactUs.value}}</a>
                        </div>
                     </div>
                  </li>
               </ul>
               <div class="col-sm-12 col-md-12 col-lg-12 mb-4">
                  <div class="social-without-bg">
                     <ul class="list-inline mb-0">
                        <li class="list-inline-item"><a class="text-white" href="javascript:void(0)"><i class="fab fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a class="text-white" href="javascript:void(0)"><i class="fab fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a class="text-white" href="javascript:void(0)"><i class="fab fa-google-plus-g"></i></a></li>
                        <li class="list-inline-item"><a class="text-white" href="javascript:void(0)"><i class="fab fa-pinterest"></i></a></li>
                        <li class="list-inline-item"><a class="text-white" href="javascript:void(0)"><i class="fab fa-linkedin-in"></i></a></li>
                     </ul>
                  </div>
               </div>
					<div class="copright text-center col-sm-12 col-md-12 col-lg-12">
					  <span class="text-white ">&copy; 2020, All Right Reserved </span>
				</div>
            </div>
				
         </div><!-- container closed -->
      </div>
   </div>   
</template>
<script>


   export default{
      components:{

      },
      data(){
         return{
            data:[
            {
               "value":"+82 10-8399-3445",
               "heading":"Phone",
               "img":"fa fa-phone",
            },

            {
               "value":"gmldbs3445@gmail.com",
               "heading":"Mail",
               "img":"fa fa-envelope-o",
            },
            {
               "value":"2066, Seobu-ro, Jangan-gu, Suwon-si, Gyeonggi-do, Republic of Korea",
               "heading":"Address",
               "img":"fa fa-location-arrow",
            } 
         ]
         }
		},
   }
</script>