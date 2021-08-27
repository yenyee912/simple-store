<template>
  <div v-if="isBusy==false">
    <hr />
    <div class="summary-bg" v-if="mySummary.content.length > 0">
      <div>
          <div class="summary-title">
            <!-- <p class="mt-2">Order Date</p>
            <p class="date-font">{{ mySummary.orderDate }}</p> -->

            <p class="mt-2">Delivery Date</p>
            <p class="date-font">{{ mySummary.deliveryDate }}</p>
          </div>

          <div class="text-center">
            <b-table
              head-variant="dark"
              :fields="column"
              responsive
              :items="mySummary.content"
              class="d-inline"
            >
              <template v-slot:cell(quantity)="row">
                <b-spinbutton v-model="row.item.quantity" @change="updateQuantity(row.index,row.item.quantity)"></b-spinbutton>
              </template>
              
              <template v-slot:cell(removeItem)="row">
                <b-icon icon="x" variant="danger" scale="1.0" @click="removeConfirmation(row.item, row.index)" ></b-icon>
              </template>
            </b-table>
          </div>

          <b-modal id="modal-remove-item" title="REMOVE ITEM" size="md" class="modal-box"
            ok-title="Yes" ok-variant="success" @ok="deleteItem"
            cancel-title="No" cancel-variant="danger"> 
            <p class="my-4">Do you want to remove this item from shopping cart?</p>
            <p>Cultivar: <strong>{{selectedItem.name}} ({{selectedItem.shortcode}})</strong></p>
            <p>Quantity: <strong>{{selectedItem.quantity}} grids</strong></p>

          </b-modal>

          <div>
            <b-row>
              <b-col class="summary-total">Total </b-col>
              <b-col class="summary-calc"> {{ calcDisplay.length }} bin(s) </b-col>
            </b-row>
            <b-row>
              <b-col class="summary-total mt-0">*21 grids = 1 bin</b-col>
            </b-row>
          </div>

          <!-- {{calcDisplay}} -->
          <hr />
          <!-- {{mySummary.content}} -->

          <div class="bin-preview">
            <b-table-simple responsive v-for="(bin, binCount) in calcDisplay" :key="bin" :index="binCount" 
            small caption-top bordered>
              Bin {{parseInt(binCount+1)}}
              <b-tr v-for="row in bin.content" :key="row">
                <b-th v-for="cul in row.items" :key="cul" :style="'background-color: '+bindColor(cul)">{{cul}}</b-th>
              </b-tr>
            </b-table-simple>
          </div>

          <div>
            <b-row>
              <b-col class="summary-title">Remarks</b-col>
            </b-row>
            <b-row>
              <b-col class="remarks-box mt-0 text-left">
                <b-form-textarea placeholder="Leave a message..." v-model="remarks"></b-form-textarea>
              </b-col>             
            </b-row>
          </div>
      </div>
    </div>
    <div class="confirm-button" v-if="!isSubmit">
      <b-button
        v-if="mySummary.content.length"
        class="btn-block confirm"
        @click="submitBooking"
        variant="success"
        >CONFIRM</b-button
      >
    </div>
    <div class="summary-result" v-else>
      <p style="margin-top: 50px; font-size: 20px; line-height: 26px">
        Thank You <br />
        for your booking!
      </p>
      <p style="font-size: 16px; margin-top: 30px">Your purchase order number is</p>
      <p style="font-size: 24px; margin-top: -18px; color: green">
        {{ returnMsg }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props: {
    mySummary: {
      type: Object,
    },
  },
  data() {
    
    return {
      myCultivarList: [], // dont get from main component--> data passing delay

      isBusy: true,
      isSubmit: false,
      returnMsg: "",
      totalWeight: 0,
      remarks: "",
      totalBinCount: 0,
      column: [
        {
          key: "name",
          label: "Cultivar",
        },
        {
          key: "quantity",
          label: "Booked Quantity (grid)",
        },
        {
          key: "removeItem",
          label: ""
        }
      ],

      selectedItem: {
        name: "",
        quantity: "",
        shortcode: "",
        indexInList: -1
      }
    }
  },
  methods: {
    updateQuantity(index, quantity){
      this.mySummary.content[index].quantity= quantity

      this.$emit('fromOrderSummary', {index: index, newQuantity: quantity})
    },

    async submitBooking() {
      try {
        this.mySummary.remarks= this.remarks
        this.mySummary.binCount= this.calcDisplay.length      
        const x = await axios.post(`${process.env.VUE_APP_ROOT_API}/bin_booking`, this.mySummary)

        if(x.data.data.PO){
          this.returnMsg = x.data.data.PO
          this.mySummary.content=[]
          this.isSubmit= true
          this.$emit('fromOrderConfirm',{isSubmit: this.isSubmit})
        }

      } 
      
      catch (err) {
        console.log("Error is", err.message)
      }
    },

    removeConfirmation(item, index){
      this.selectedItem.name= item.name
      this.selectedItem.quantity= item.quantity
      this.selectedItem.shortcode= item.shortcode
      this.selectedItem.indexInList= index
      
      this.$bvModal.show("modal-remove-item")	

    },

    deleteItem(){
      this.mySummary.content.splice(this.selectedItem.indexInList, 1)
    },

    defineCultivarStyleClass(){
      const [hueMin, hueMax, satMin, satMax, lightnessMin, lightnessMax] = [0, 360, 50, 100, 60, 90]; //hue 0 to 360 modular, sat 50 to 100, lightness 60 to 90
      // let cultArray= []
      // cultArray = ['LLOR', 'LPCR', 'CSWC', 'KPPK']

      // define how much the color change= colorRange/ cultivar list.length
      const hueIncrement = Math.floor((hueMax - hueMin) / this.myCultivarList.length);
      const satIncrement = Math.floor((satMax - satMin) / (Math.sqrt(this.myCultivarList.length))) - 1;
      const lightnessIncrement = Math.floor((lightnessMax - lightnessMin) / (Math.sqrt(this.myCultivarList.length))) - 1;
      let hueCounter = hueMin;
      let satCounter = satMin;
      let lightnessCounter = lightnessMin;

      // this.myCultivarList.forEach(el =>{
      //   cultArray.push(el.shortcode)
      // })
  
      this.myCultivarList.forEach((el) => {
        el.style=`hsl(${hueCounter}, ${satCounter}%, ${lightnessCounter}%)`
          // name: el
        
        if (satCounter + satIncrement <= satMax) {
            satCounter += satIncrement;
        } 
        
        else if (lightnessCounter + lightnessIncrement <= lightnessMax) {
          lightnessCounter += lightnessIncrement;
          satCounter = satMin;
        }   
        
        else {
          satCounter = satMin;
          lightnessCounter = lightnessMin;
        }
    
        hueCounter += hueIncrement;
      });
    },

    bindColor(shortcode){
      let styleClass= this.myCultivarList.filter(el =>{
        return el.shortcode== shortcode
      })[0].style
    
      return styleClass
    },

    splitRow(arr){
      let returningArr=[]

      for (let k=0; k<arr.length; k++){        
        let nextIndex= 0
        if (k%7==0){
          nextIndex= k
          returningArr.push({row: (returningArr.length+1), items: arr.slice(nextIndex, nextIndex+7)}) 
        }
      }

      return returningArr
    },

    splitBin(arr){
      let returningArr=[]

      for (let h=0; h<arr.length; h++){        
        let nextIndex= 0
        if (h%3==0){
          nextIndex= h
          returningArr.push({bin: (returningArr.length+1), content: arr.slice(nextIndex, nextIndex+3)})
        }
      }

      return returningArr
    },

    async getCultivar() {
      try {
        this.isBusy= true
        const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/cultivars/`)
        this.myCultivarList = x.data.data
        this.defineCultivarStyleClass()
        this.isBusy= false
      } catch (err) {
        console.log(err.message)
      }
    },
  },
  computed: {
    // calcTotal() {
    //   // let total = 0
    //   // let totalBin = 0
    //   // for (let i = 0; i < this.mySummary.content.length; i++) {
    //   //   total += this.mySummary.content[i].quantity
    //   // }

    //   // totalBin = (total%21)

    //   // if(totalBin==0)
    //   //   return parseInt(total/21)
      

    //   // else
    //     // return parseInt(total/21)+1

      
    // },

    calcDisplay(){
      let cultivarArr= []
      let spinachArr= []

      for (let i=0; i<this.mySummary.content.length; i++){
          for (let j=0; j<this.mySummary.content[i].quantity; j++){
            if (this.mySummary.content[i].shortcode[0]!="S")
              cultivarArr.push(this.mySummary.content[i].shortcode)
            else
              spinachArr.push(this.mySummary.content[i].shortcode)
          }
      }

      let display=[]
      if (cultivarArr.length>0){
        let rowArr=this.splitRow(cultivarArr)
        let binArr= this.splitBin(rowArr)
        binArr.forEach(el =>{
          display.push(el)
        })
      }

      if (spinachArr.length>0){
        let rowArr=this.splitRow(spinachArr)
        let binArr= this.splitBin(rowArr)
        binArr.forEach(el =>{
          display.push(el)
        })
      }

      return display
    },

  },

  created(){
    this.getCultivar()
  }
}
</script>

<style scoped>
.confirm-button {
  margin-right: 10px;
  margin-left: 10px;
}
.confirm {
  font-family: "Nunito", "Futura", sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 1.5px;
  margin-top: 25px;
  border-radius: 12px;
  height: 48px;
}

.table-font {
  font-weight: 400;
}

.date-font {
  font-size: 22px;
  margin-top: -15px;
  color: green;
}

.summary-title {
  font-family: "Nunito", "Futura", sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.4px;
  color: gray;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 20px;
}

.summary-bg {
  background-color: white;
  text-align: left;
  padding-top: 15px;
  padding-bottom: 5px;
  border-radius: 10px;
  margin-top: 26px;
  margin-left: 10px;
  margin-right: 10px;
}

.summary-result {
  font-family: "Nunito", "Futura", sans-serif;
  font-weight: 700;
  margin: 15px;
  text-align: center;
  color: #28273d;
}

.summary-item {
  text-align: left;
}

.summary-total {
  text-align: left;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 30px;
  margin-left: 20px;
}

.summary-calc {
  font-family: "Nunito", "Futura", sans-serif;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: green;
  margin-right: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.rounded {
  /* border: 1px solid darkgray;
  border-radius: 3px;
  px: 2px */
  background-color: white;
  padding: 0px;
}

.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}

.remarks-box {
  text-align: right;
  margin-bottom: 20px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
}

.bin-preview {
  text-align: right;
  margin-bottom: 20px;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 13px;
  text-align: left;
  font-weight: normal;
}

footer {
  background-color: antiquewhite;
}
</style>
