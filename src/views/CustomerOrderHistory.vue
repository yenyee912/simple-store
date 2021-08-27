<template>
  <div>
    <div class="m-4">
      <h2 class="title-order">My Order</h2>
    </div>
    <div class="px-4 history">

      <div v-if="isBusy==false">
      <!-- if there is history -->
      <div v-if="history.length>0" class="text-center">
        <b-table
        class="history-table" responsive :items="history" :fields="column" striped hover head-variant="dark">
          <template v-slot:cell(show_details)="row">
            <b-button 
              @click="row.toggleDetails"
              class="button-details"
            >{{ row.detailsShowing ? "HIDE" : "SHOW" }}</b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
                <div class="mb-2">
                  <b-table :items="row.item.content" :fields="[{key: 'name', label: 'Cultivar'}, {key: 'quantity', label: 'Quantity (grid)'}]">
                  </b-table>

                <div>
                  <b-row>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col></b-col>
                    <b-col>
                  <b-button class="ok-button" @click="row.toggleDetails" variant="success">OK</b-button>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-card>
          </template>
        </b-table>
      </div>

      <!-- if there is no history -->
      <div v-if="noHistory!=''" class="mb-12">{{noHistory}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  components: {},
  props: {},
  data() {
    return {
      // startDate: moment().format('YYYY-MM-DD'),
      // endDate: moment().format('YYYY-MM-DD'),
      // endDate: "2020-10-20",
      // startDate: "2020-10-01",
      isBusy: false,
      history: [],
      noHistory:'',
      
      // 3= langkawi
      farmLocation: 4, 
      column: [
        { key: 'PO', label: 'Reference Number(PO)', sortable: true },
        {
          key: 'orderDate',
          label: 'Order Date',
          sortable: true
        },
        
        {
          key: 'deliveryDate',
          label: 'Delivery Date',
          sortable: true
        },

        // { key: 'remarks', label: 'Remarks' },

        {
          key: 'show_details'
        }
      ]
    }
  },
  methods: {
    async callAPI() {
      this.isBusy = true
      await this.getHistory(this.farmLocation);
      
      if (this.history !=-1){
        await this.formatDate();
      }
      this.isBusy = false
    },

    async getHistory(farm) {
      let query = `${process.env.VUE_APP_ROOT_API}/bin_booking?location=${farm}&email=${JSON.parse(localStorage.user).user.email}`
      try {
        const x = await axios.get(query)

        if (x.data.data.length>0){
          this.history = x.data.data
        }

        else{
          this.noHistory='No order record.'
        }
      } catch (err) {
        console.log(err.message)
      }
      this.isBusy = false
    },

    async formatDate(){
        this.history.forEach(element =>{
          element.orderDate= moment(element.orderDate).format('DD-MM-YYYY')
        })
    }
  },

  mounted() {
    this.callAPI()
  }
}
</script>

<style>
.title-order {
  font-family: 'Cooper Black', sans-serif;
  font-weight: bold;
  margin-top: 55px;
  margin-left: 10px;
  color: #2bb573;
  font-size: 40px;
}

.button-details {
  background-color: #fdc160!important;
  border-color: #fdc160!important;
  font-size: 14px!important;
  color: #28273d!important;
  font-weight: bold!important; 
  letter-spacing: .6px;
  border-radius: 10px!important;
  width: 120px; 
  height: 38px;  
  font-weight: 500; 
}

.ok-button {
  width: 92px; 
  font-weight: 600!important; 
  font-size: 14px!important; 
  border-radius: 10px!important; 
  /* margin-right: 5px!important;  */
  margin-left: 40px;
  width: 120px; 
  height: 38px;
}



.no-history{
  font-family: 'Nunito', 'Futura', sans serif;
}

.history{
  margin-left: 10px; 
  margin-right: 10px; 
  margin-bottom: 150px;
}

.history-table{
  border-radius: 10px; 
  color: #28273d; 
  font-weight: 600; 
  font-size: 16px; 
  margin-top: 40px;
}

.items-booked{
  font-weight: 500; 
  font-size: 16px; 
  color: #28273d; 
  margin-left: 35px;
}

.cultivars-booked{
  font-weight: bold; 
  font-size: 18px; 
  color: green;
}
</style>