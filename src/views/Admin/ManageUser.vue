<template>
   <div>
      <PageTitle
         headerTitle="Manage User"
         headerSubTitle="You can modify user information and delete user and change user's permission"
      >
      </PageTitle>
      <div class="product-wrapper section-gap">
         <div class="container">
               <v-data-table :headers="headers" :items="Users" :search="search" :items-per-page="10" :footer-props="{
                  prevIcon: 'fa fa-angle-left',
                  nextIcon: 'fa fa-angle-right'
                  }" 
                  :header-props="{
                     sortIcon: 'fa fa-angle-down'
                  }">
               <template v-slot:top="">
                  <v-toolbar flat="" color="white">
                  <h1>Users List</h1>
                  <v-text-field
                     v-model="search"
                     label="Search"
                     class="mx-4"
                  ></v-text-field>
                  <div class="flex-grow-1"></div>
                   <v-dialog v-model="edit_dialog" max-width="500px">
                     <v-card>
                        <v-card-text>
                        <v-container>
                           <div class="row mb-3">
                              <div class="col-sm-12 col-md-12 m-md-b">
                                 <h2 class="text-capitalize font-2x mb-4">Edit {{selected_user.userID}} Information</h2>
                                 <form class="billing-form" action="javascript:void(0)" method="post">
                                    <div class="form-group row">
                                       <div class="col-sm-12 col-md-6 m-xs-b">
                                          <label>User ID<sup class="font-lg ml-1 align-bottom">*</sup></label>
                                          <input type="text" class="form-control form-control-lg" v-model="selected_user.userID" disabled />
                                       </div>
                                       <div class="col-sm-12 col-md-6">
                                          <label>Nick Name</label><sup class="font-lg ml-1 align-bottom">*</sup>
                                          <input type="text" class="form-control form-control-lg" v-model="selected_user.nickname"/>
                                       </div>
                                    </div>
                                    <div class="form-group">
                                       <label>Company Name</label>
                                       <input type="text" class="form-control form-control-lg" placeholder="Company Name" v-model="selected_user.company" required />
                                    </div>
                                    <div class="form-group row">
                                       <div class="col-sm-12 col-md-6">
                                          <label>Email Address</label>
                                          <input type="Email" class="form-control form-control-lg" placeholder="Email Address" v-model="selected_user.email" required />
                                       </div>
                                       <div class="col-sm-12 col-md-6">
                                          <label>Phone</label>
                                          <input type="Tel" class="form-control form-control-lg" placeholder="Phone Number" v-model="selected_user.phone" required />
                                       </div>
                                    </div>
                                    <div class="form-group">
                                       <label>Country</label>
                                       <input type="text" class="form-control form-control-lg" placeholder="Country" v-model="selected_user.country"/>
                                    </div>
                                    <div class="form-group">
                                       <label>Address</label>
                                       <input type="text" class="form-control form-control-lg" placeholder="Address" v-model="selected_user.address"/>
                                    </div>
                                    <div class="form-group row">
                                       <div class="col-sm-12 col-md-6">
                                          <label>Town/City</label>
                                          <input type="text" class="form-control form-control-lg" placeholder="City" v-model="selected_user.city"/>
                                       </div>
                                       <div class="col-sm-12 col-md-6">
                                          <label>Postal Code</label>
                                          <input type="text" class="form-control form-control-lg" placeholder="Postal Code" v-model="selected_user.postal" />
                                       </div>
                                    </div>
                                 </form>
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
                  <v-dialog v-model="delete_dialog" max-width="500px">
                     <v-card>
                        <v-card-title>
                        <span style="margin-bottom: 40px;" class="headline">Delete this User?</span>
                        </v-card-title>
                        <v-card-actions>
                           <v-btn color="blue darken-1" text="" @click="close_delete()">Cancel</v-btn>
                           <v-btn color="blue darken-1" text="" @click="remove()">Delete</v-btn>
                        </v-card-actions>
            
                     </v-card>
                  </v-dialog>
                  </v-toolbar>
               </template>
            
               <template v-slot:[`item.action`]="{ item }">
                  <a style="margin-right:20%"><i class="fa fa-edit" @click="editItem(item)"></i></a>
                  <a><i class="fa fa-trash" @click="deleteItem(item)"></i></a>
               </template>
               <template v-slot:[`item.action2`]="{ item }">
                  <v-list-item-action>
                     <v-switch
                        label="Admin"
                        inset
                        v-model="item.isAdmin"
                        @click="change_permission(item)"
                     ></v-switch>
                  </v-list-item-action>
               </template>
            </v-data-table>

            <!-- row closed -->
         </div><!-- container closed -->
      </div>
   </div>
</template>
<script>
export default {
  data: () => ({
     search: "",
     selected_user: null,
     edit_dialog: false,
     delete_dialog: false,
    headers: [
      { text: "Id", value: "userID", width: "10%" },
      { text: "First Name", value: "first_name", width: "10%"},
      { text: "Last Name", value: "last_name", width: "10%"},
      { text: "Nick Name", align: "left", sortable: true, value: "nickname" },
      { text: "Phone Number", value: "phone"},
      { text: "type", value: "type"},
      { text: "Actions", value: "action", sortable: false, width: "15%" },
      { text: "Admin Permission", value: "action2", sortable: false, width: "7%"}
    ],
    editedIndex: -1,  // New Category
    editedItem: {
      id: 0,
      name: ""
    },
    defaultItem: {
      id: 0,
      name: ""
    }
  }),
  created() {
     this.selected_user = this.$store.getters.getUser
  },
  firestore() {
    return {
      Users: this.$database.collection('Users'),
    }
  },
  methods: {
    editItem(item) {
      this.dialogDelete = false
      this.selected_user = item
      this.edit_dialog = true
    },
 
    deleteItem(item) {
      this.dialogDelete = true
      this.selected_user = item
      this.delete_dialog = true
    },
    close_edit() {
       this.edit_dialog=false
    },
    close_delete() {
       this.delete_dialog=false
    },
    save() {
       this.$database.collection("Users").doc(this.selected_user.userID).set(this.selected_user, {merge: true})
       this.edit_dialog=false
    },
    remove() {
       this.$database.collection("Users").doc(this.selected_user.userID).delete()
       this.delete_dialog=false
    },
    change_permission(item) {
       this.$database.collection("Users").doc(item.userID).set({isAdmin: item.isAdmin}, {merge: true})
    },
  },
};
</script>
<style>
#table > .v-data-footer .v-icon {
  color: black !important;
}
</style>