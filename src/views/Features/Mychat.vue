<template>
   <div>
      <PageTitle
         headerTitle="Chat Page"
         headerSubTitle="You can chat with buyer or seller in guarantee reponsable!"
      >
      </PageTitle>
      <div class="product-wrapper section-gap">
         <div class="container">
            <div class="row mb-3">
               <div class="col-sm-12 col-md-6 m-md-b">
                  <b-row>
                     <b-col cols="12">
                        <h2>
                        Chat List
                        </h2>
                        <div class="chat-box" v-chat-scroll>
                        
                        <b-list-group>
                           <b-list-group-item class="chat-item" v-for="(user,idx) of chat_user_list.users" :key="idx">
                              <a>
                              <div class="chat-message text-left" text-left @click="change_target(user)">
                                 <b-card border-variant="secondary">
                                    <b-card-title>{{user}}</b-card-title>
                                 </b-card>
                              </div>
                              </a>
                           </b-list-group-item>
                        </b-list-group>
                        </div>
                     </b-col>
                  </b-row>
               </div>
               <div class="col-sm-12 col-md-6 m-md-b">
                  <b-row>
                     <b-col cols="12">
                        <h2>
                        {{seller}}
                        </h2>
                        <div class="chat-box" v-chat-scroll>
                        <b-list-group>
                           <b-list-group-item class="chat-item" v-for="(chat,idx) of chats" :key="idx">
                              <div class="chat-status text-center" v-if="chat.type==='join'||chat.type==='exit'">
                              <span class="chat-date">{{chat.time}}</span>
                              <span class="chat-content-center">{{chat.message}}</span>
                              </div>
                              <div class="chat-message text-right" v-else-if="chat.sender === user.userID">
                                 <div class="right-bubble">
                                    <span class="msg-name">Me</span>
                                    <span class="msg-date">{{chat.time}}</span>
                                    <p text-wrap>{{chat.message}}</p>
                                 </div>
                              </div>
                              <div class="chat-message text-left" text-left v-else>
                                 <div class="left-bubble">
                                    <span class="msg-name">{{chat.user}}</span>
                                    <span class="msg-date">{{chat.time}}</span>
                                    <p text-wrap>{{chat.message}}</p>
                                 </div>
                              </div>
                           </b-list-group-item>
                        </b-list-group>
                        </div>
                        <b-form>
                           <b-input-group>
                              <b-form-input id="message" v-model="input_msg" placeholder="Enter your message"></b-form-input>
                              <b-button class="primary" @click="sendMsg()">Send</b-button>
                           </b-input-group>
                        </b-form>
                     </b-col>
                  </b-row>
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
      input_msg: "",
      user: null,
      seller: null,
      nickname: "me",
      chats:null,
      chat_user_list: [],
    };
  },
  created() {
    this.user = this.$store.getters.getUser
    this.seller = this.$store.getters.getSeller
  },
  mounted() {
  },
  firestore() {
   return {
      chats : this.$store.getters.getSeller!=null ? this.$database.collection('Msg').doc(this.$store.getters.getUser.userID).collection(this.$store.getters.getSeller).orderBy("time") : 
      (this.sellers == null ? [] : this.$database.collection('Msg').doc(this.$store.getters.getUser.userID).collection(this.seller).orderBy("time")),
      chat_user_list: this.$database.collection('Msg').doc(this.$store.getters.getUser.userID)
   }
  },
  methods: {
     sendMsg () {
        console.log((new Date).toTimeString().slice(0,8))
        if(this.input_msg=="")
        {
           alert("input message!")
           return
        }
        this.$database.collection('Msg').doc(this.user.userID).collection(this.seller).add({
           message: this.input_msg,
           type: 'msg',
           sender: this.user.userID,
           time: (new Date()).toDateString()+' '+(new Date).toTimeString().slice(0,8)
        })
        this.$database.collection('Msg').doc(this.seller).collection(this.user.userID).add({
           message: this.input_msg,
           type: 'msg',
           sender: this.user.userID,
           time: (new Date()).toDateString()+' '+(new Date).toTimeString().slice(0,8)
        })
        this.input_msg=""
     },
     change_target(user) {
        console.log(this.chats)
        this.$store.commit('setSeller',user)
        this.$router.go(0)
        //location.reload()
        //this.seller = user

        var change_chats_func = this.change_chats
        this.$database.collection('Msg').doc(this.user.userID).collection(this.seller).orderBy("time").get().then(function (docs) {
           var new_chat = []
           for(var i=0;i<docs.docs.length;i++)
           {
              console.log(docs.docs[i].data())
              new_chat.push(docs.docs[i].data())
           }
           change_chats_func(new_chat)
        })
     },
     change_chats(new_chat) {
        this.chats = new_chat
     }
  },
  watch: {
   chats: function () {
      console.log(this.chats)
   },
  }
};
</script>
<style>
  .chat-box {
    height: 500px;
    width: 100%;
    overflow: scroll;
  }
  .chat-item {
    border: none;
  }
  .chat-status {
    min-height: 49px;
  }
  .chat-status .chat-date {
    display: block;
    font-size: 10px;
    font-style: italic;
    color: #999;
    height: 15px;
    left: 10%;
    right:10%;
  }
  .chat-status .chat-content-center {
    padding: 5px 10px;
    background-color: #e1e1f7;
    border-radius: 6px;
    font-size: 12px;
    color: #555;
    height: 34px;
    left: 10%;
    right:10%;
  }
  .chat-message {
    width: 80%;
    min-height: 40px;
  }
  .chat-message .right-bubble {
    position: relative;
    background: #dcf8c6;
    border-top-left-radius: .4em;
    border-bottom-left-radius: .4em;
    border-bottom-right-radius: .4em;
    padding: 5px 10px 10px;
    left: 15%;
  }
  .chat-message .right-bubble span.msg-name {
    font-size: 12px;
    font-weight: bold;
    color: green;
    display: block;
  }
  .chat-message .right-bubble span.msg-date {
    font-size: 10px;
    display: block;
  }
  .chat-message .right-bubble:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-left-color: #dcf8c6;
    border-right: 0;
    border-top: 0;
    margin-top: -0.5px;
    margin-right: -27px;
  }
  .chat-message .left-bubble {
    position: relative;
    background: #efefef;
    border-top-right-radius: .4em;
    border-bottom-left-radius: .4em;
    border-bottom-right-radius: .4em;
    padding: 5px 10px 10px;
    left: 5%;
  }
  .chat-message .left-bubble span.msg-name {
    font-size: 12px;
    font-weight: bold;
    color: blue;
    display: block;
  }
  .chat-message .left-bubble span.msg-date {
    font-size: 10px;
    display: block;
  }
  .chat-message .left-bubble:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border: 27px solid transparent;
    border-right-color: #efefef;
    border-left: 0;
    border-top: 0;
    margin-top: -0.5px;
    margin-left: -27px;
  }
</style>