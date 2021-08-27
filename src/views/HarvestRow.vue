<template>
  <div>
    <b-row class="no-margin" sm="12" md="12">
      <b-col sm="8" md="8" style="margin-bottom: 3rem;">
        <div class="px-2" style="padding-top: 3rem; padding-bottom: 1rem;">
          <h2 class="title-font m-2">What's Available</h2>
        </div>

        <!--1 day-->
        <div class="py-2 px-2" v-for="(x, index) in allDaysForDisplay" :key="x.date" :index="index">
          <!-- date-header -->
          <div v-b-toggle="'day-' + index" class="border py-3 px-3 mb-2 h5 list-font">
            <b-icon icon="chevron-double-down" animation="cylon-vertical" class="strong mr-2"></b-icon>
            {{ x.dayOfWeek }} {{ x.date }}
            <b-badge
              class="ml-2 harvest-available"
              style="margin-top: -4px;"
              variant="success"
              v-if="x.veg.length"
            >Harvest ({{ x.veg.length }} cultivars)</b-badge>
            <b-badge v-else class="ml-2 harvest-soldout" style="margin-top: -4px;" variant="danger">No Harvest</b-badge>
          </div>

          <!-- product cards group -->
          <!-- pass API data to child component -->
          <b-collapse :id="'day-' + index" accordion="my-accordion">
            <div v-if="x.veg.length>0">
              <cultivar-cards
                :myCultivar="x.veg"
                :myCultivarDay="index"
                :myDate="x.deliveryDate"
                @fromCultivarCards="rxFromCultivarCards"
              ></cultivar-cards>
            </div>
            <div v-else class="sold-out">Sorry, no available harvest today.</div>
          </b-collapse>
        </div>
      </b-col>

      <b-col sm="4" class="summary-bg">
        <div style="padding-top: 3.8rem;">
          <h2 class="summary-font m-2">Order Summary</h2>
          <!-- <div>
           <b-form-group label="Order Remarks">
          <b-input placeholder="Please enter order remarks." v-model=bookingSummary.remarks></b-input>
          </b-form-group></div>-->
          <order-summary-card :mySummary="bookingSummary" />
        </div>
      </b-col>
      <b-overlay :show="isBusy" no-wrap></b-overlay>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import CultivarCards from '../components/CultivarCards'
import moment from 'moment'
import OrderSummary from '../components/OrderSummary.vue'

export default {
  name: 'harvest-row',
  components: {
    'cultivar-cards': CultivarCards,
    'order-summary-card': OrderSummary
  },
  data() {
    return {
      isBusy: false,
      isSubmit: false,
      availableCultivar: [],
      allDaysForDisplay: [],
      cultivarList: [],

      //dummy
      // dummy: [
      //   { id: 2, weight: 3.33 },
      //   { id: 12, weight: 2.33 },
      //   { id: 7, weight: 1 },
      //   { id: 3, weight: 4.56 },
      //   { id: 21, weight: 0 },
      //   { id: 19, weight: 0 }
      // ],

      //----------------------------
      bookingSummary: {
        farmLocation: 'langkawi',
        email: JSON.parse(localStorage.user).user.email,
        orderDate: '',
        remarks: '',
        booking: []
      }
    }

  },
  methods: {
    async displayAPI() {
      this.isBusy = true
      //prepare cultivar data
      await this.retrieveCultivar()
      //set start date end date (7)
      await this.setDate()
      //save all 7 times API call data
      await this.retriveAllDays()
      this.allDaysForDisplay = [...this.availableCultivar]
      this.isBusy = false

    },

    // receive day level input (cultivar card)
    rxFromCultivarCards(obj) {
      let currentDate = obj.date
      let cart = []
      for (let a = 0; a < obj.itemsOrdered.length; a++) {
        let currentItem = {
          id: obj.itemsOrdered[a].id,
          name: obj.itemsOrdered[a].name,
          bookingWeight: obj.itemsOrdered[a].weight,
          price: obj.itemsOrdered[a].unitPrice
        }
        cart.push(currentItem)
      }

      let currentByDay = {
        deliveryDate: currentDate,
        itemOrdered: cart
      }
      this.bookingSummary.booking.splice(0, 1, currentByDay)
    },

    findEmpty(arr) {
      let tempArr = null
      for (let i = 0; i < arr.length; i++) {
        if (arr.weight > 0) {
          tempArr.push(arr[i])
        }
      }
      return tempArr
    },
    
    // save all 7 days data into one arr allDays[]
    async retriveAllDays() {
      for (let i = 0; i < this.availableCultivar.length; i++) {
        let query = `${process.env.VUE_APP_ROOT_API}/inv/getWeight?date=${this.availableCultivar[i].date}&location=3`
        let x = await axios.get(query)
        try {
          console.log(x.data)
          let tempArr = x.data.filter(obj =>{
            return obj.weight>0
          })
          this.availableCultivar[i].veg = tempArr
        } 
        
        catch (err) {
          console.log(err.message, x.data)
        }
      }
    },
   
   // pull cultivar id, name and aveWeight --> fixed fields
    async retrieveCultivar() {
      // const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/cultivars`)
      try {
      const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/cultivar/getAll`)

        this.cultivarList = x.data
      } catch (err) {
        console.log(err.message)
      }
    },

      setDate(){
      let today = moment().format("YYYY-MM-DD")
      this.bookingSummary.orderDate = moment(today).format("MM-DD-YYYY")
        
      const startDate = moment(today).add(2, 'd')
      const endDate = moment(startDate).add(6, 'd')

      let startOfWeek = moment(startDate, "YYYY-MM-DD");
      let endOfWeek = moment(endDate, "YYYY-MM-DD");

      let days = [];
      let day = startOfWeek;

      while (day <= endOfWeek) {
          days.push({date: day.format("YYYY-MM-DD"), dayOfWeek: day.format("ddd"), deliveryDate: day.format("MM-DD-YYYY")});
          day = day.clone().add(1, "d");
      }

      this.availableCultivar=days
      console.log(days)
    }
  },
  mounted() {
    this.displayAPI()
  }
}
</script>

<style scoped>
.border{
  background-color: #28273d;
  border-radius: 8px;
}

.list-font {
  font-family: 'Nunito', 'Futura', sans-serif;
  color: white;
  font-weight: bold;
}

.title-font {
  font-family: 'Cooper Black', sans-serif;
  font-weight: bold;
  color: #2bb573;
  font-size: 40px;
}

.summary-font {
  font-family: 'Nunito', 'Futura', sans-serif;
  color: #28273d;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0px;
}

.harvest-available {
  font-family: 'Nunito', 'Futura', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .5px;
  float: right;
  width: 180px;
  height: 26px;
  padding-top: 6px;
  text-align: center;
  background-color: #2bb573;
  color: white;
}

.harvest-soldout {
  font-family: 'Nunito', 'Futura', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .5px;
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
  font-family: 'Nunito', 'Futura', sans-serif;
  color: red;
}
.in-stock {
  color: green;
}
.h5 {
  font-size: 15px;
}
</style>
