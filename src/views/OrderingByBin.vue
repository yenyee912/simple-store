<template>
  <div>
    <b-row class="no-margin" sm="12" md="12">
      <b-col sm="8" md="8" style="margin-bottom: 3rem">
        <div class="px-2" style="padding-top: 3rem; padding-bottom: 1rem" v-if="isOrderSubmit==false">
          <h2 class="title-font m-2">Booking</h2>

          <p class="summary-font">Please select delivery date.</p>
          <b-row>
            <b-col cols="5">
              <b-form-datepicker @context="resetAll(false)" v-model="deliveryDate" :disabled="showCultivarList"
                size="sm" :min="availableDate"></b-form-datepicker>
              <p class="sold-out mt-2" v-if="isEmptyDate">Please select a date.</p>
            </b-col>
            <b-col cols=3>
                <b-btn v-if="!showCultivarList" :disabled="showCultivarList" @click="checkBinAvailability" 
                size="sm" variant="success">
                <b-overlay  :show="isChecking" opacity="0.5" size="md">Check</b-overlay>
                </b-btn>

              <b-btn v-if="showCultivarList" @click="resetAll(true)" 
              size="sm" variant="warning">
                Select new date
              </b-btn>              
            </b-col>
          </b-row>
        <!-- v-if="showCultivarList" -->
          <p v-if="availableBin>=0" :class="[availableBin==0? 'sold-out':'in-stock', 'mt-2']">We have <strong>{{ availableBin }}</strong> bin(s) on <strong>{{ deliveryDate }}</strong>. </p>
          <div v-if="showCultivarList">
            <p class="mt-2 summary-font-p">
              You can select at max 7 type of cultivars per bin, and at least
              one grid for each cultivars.
            </p>

            <!-- <b-row class="mt-3 mb-3">
              <b-col cols="5">
                <b-form-input size="sm" v-model="search" placeholder="Search by cultivar name..."
                ></b-form-input>
              </b-col>
            </b-row> -->
            <hr style="  border: 1px solid green;"/>

            <div v-for="(value, key) in cultivarList" :key="value">
              <h3 class="harvest-track title-font">{{ key.toUpperCase() }}</h3>
              <b-row class="mt-3">
                <b-col v-for="x in cultivarList[key]" :key="x.id" cols="3">
                  <b-card class="text-center mt-4"
                    :img-src="'../assets/card/' + x.id + '.webp'"
                    :img-width="170"
                    :img-height="165">
                    <h3 class="harvest-name">{{x.name}}</h3><br />
                    <selected-quantity :myBookedItem="x" @fromSelectedWeight="addToBin"/>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </div>
          <!--end of -->
        </div>
      </b-col>

      <b-col sm="4" class="summary-bg">
        <div style="padding-top: 3.8rem">
          <h2 class="summary-font m-2">Order Summary</h2>
          <!-- <div>
           <b-form-group label="Order Remarks">
          <b-input placeholder="Please enter order remarks." v-model=bookingSummary.remarks></b-input>
          </b-form-group></div>-->
          <order-summary-card :mySummary="bookingSummary" @fromOrderConfirm="rxIsSubmit" @fromOrderSummary="rxUpdateSummary" />
        </div>
      </b-col>
      <b-overlay :show="isBusy" no-wrap></b-overlay>
    </b-row>
  </div>
</template>

<script>
import axios from "axios"
import moment from "moment"
import _ from "lodash"

import OrderSummary from "../components/OrderSummary.vue"
import SelectedQuantity from "../components/SelectedQuantity.vue"
// import CultivarCards from "../components/CultivarCards"

export default {
  name: "ordering-by-bin",
  components: {
    // "cultivar-cards": CultivarCards,
    "order-summary-card": OrderSummary,
    SelectedQuantity,
  },
  data() {
    return {
      disabledDates: {
        ranges: [],
      },
      isEmptyDate: false,
      showCultivarList: true,
      isChecking: false,
      availableDate: "",
      availableBin: -1, // no changes yet
      deliveryDate: "",

      search: "",

      isBusy: false,
      isOrderSubmit: false,
      availableCultivar: [],
      cultivarList: [],

      bookingSummary: {
        orderDate: moment().format("YYYY-MM-DD"),
        deliveryDate: "",
        farmLocation: "sgbuloh",
        email: JSON.parse(localStorage.user).user.email,
        remarks: "",
        content: [],
        display: [] //visual only, (maybe can save to DB also)
      },

      sortRequest: {}, // send to binsort app
    }
  },

  methods: {
    async callAPI() {
      this.isBusy = true
      await this.getCultivar()
      this.setDate()
      this.isBusy = false
    },

    rxUpdateSummary(evt){
      // replace the old quantity updated from OrderSummary.vue
      this.bookingSummary.content.splice(evt.index, 1, {
        id: this.bookingSummary.content[evt.index].id,
        name: this.bookingSummary.content[evt.index].name,
        quantity: evt.newQuantity,
        shortcode: this.bookingSummary.content[evt.index].shortcode,
      })
    },

    addToBin(evt) {
      this.bookingSummary.content.push(evt)
    },

    async getCultivar() {
      try {
        const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/cultivars/`)
        this.cultivarList = _(x.data.data).groupBy("track").value()
        // TODO: move the groupBy to computed()

        this.cultivarList["other"]= this.cultivarList["undefined"]
        delete this.cultivarList["undefined"]

      } catch (err) {
        console.log(err.message)
      }
    },

    async checkBinAvailability() {
      this.availableBin= -1 // reset the bin

      if (this.deliveryDate== ""){
        this.isEmptyDate= true
      }

      else {
        this.isEmptyDate= false
        try {
          this.isChecking= true
        
          const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/bin_booking/inventory/bin?fulfillmentDate=${this.deliveryDate}`)

          this.availableBin = x.data.emptyBinCount

          if(this.availableBin>0){
            this.showCultivarList=true          
            this.bookingSummary.deliveryDate = this.deliveryDate
          }

          else{
            this.showCultivarList= false
          }

          this.isChecking= false
        } 
      
        catch (err) {
        console.log(err.message)
        }
      }

    },

    resetAll(isNewdate){
      if(isNewdate)
        this.deliveryDate= ""

      
      this.bookingSummary.content= []
      this.bookingSummary.deliveryDate= ""
      this.bookingSummary.remarks= ""
      this.bookingSummary.display= []
      this.availableBin=-1

      this.showCultivarList= false
      this.isEmptyDate= false
    },

    rxIsSubmit(evt){
      if (evt.isSubmit== true){
        this.isOrderSubmit= true
      }
    },

    setDate() {
      this.availableDate = moment().add(34, "d").format("YYYY-MM-DD")
    },
  },

  mounted() {
    // this.checkSpinach()
    this.callAPI()
  },
}
</script>

<style scoped>
.border {
  background-color: #28273d;
  border-radius: 8px;
}

.list-font {
  font-family: "Nunito", "Futura", sans-serif;
  color: white;
  font-weight: bold;
}

.title-font {
  font-family: "Cooper Black", sans-serif;
  font-weight: bold;
  color: #2bb573;
  font-size: 40px;
}

.summary-font {
  font-family: "Nunito", "Futura", sans-serif;
  color: #28273d;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0px;
}

.summary-font-p{
  font-family: "Nunito", "Futura", sans-serif;
  color: #15680a;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0px;
}

.harvest-available {
  font-family: "Nunito", "Futura", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  float: right;
  width: 180px;
  height: 26px;
  padding-top: 6px;
  text-align: center;
  background-color: #2bb573;
  color: white;
}

.harvest-soldout {
  font-family: "Nunito", "Futura", sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  float: right;
  width: 180px;
  height: 26px;
  padding-top: 6px;
  text-align: center;
  background-color: red;
  color: white;
}

#orderSummary {
  background-color: antiquewhite;
}
.summary-bg {
  text-align: center;
  background-color: antiquewhite;
  /* box-shadow: 5px -5px 8px darkslategray; */
}

.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}
.sold-out {
  font-family: "Nunito", "Futura", sans-serif;
  color: red;
}
.in-stock {
  color: green;
}
.h5 {
  font-size: 15px;
}

.spin-button {
  border-radius: 5px;
  width: 130px;
}

.harvest-name {
  text-align: center;
  margin-top: 20px;
  margin-bottom: -10px;
  font-size: 20px;
  font-weight: bold;
  color: #28273d;
}

.harvest-track {
  font-family: "Nunito", "Futura", sans-serif;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
  color: #2bb573;
}

</style>
