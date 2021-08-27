<template>
    <div class="in-stock">
      <div>
        <b-row class="">
          <b-col>
            <b-form-spinbutton class="spin-button" size="sm"
              v-model="orderQuantity" min="0" step="1" />
          </b-col>
        </b-row>
      </div>

      <b-btn @click="handleClick" class="text-center mt-4 mb-4 btn-block add-button"
        size="sm">Add to Bin
      </b-btn>
      <!-- disabled="checkSpinach==true" -->
      <div sm="6" md="4">
        <b-alert size="sm"
          class="mb-2 in-stock"
          variant="light"
          :show="dismissCountDown"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
          style="margin: 0px; padding: 0px">
          Added!
        </b-alert>
      </div>
    </div>
</template>

<script>
export default {
  name: 'selected-quantity',

  props: {
    myBookedItem: {
      type: Object,
    },
  },

  data() {
    return {
      orderQuantity: 0,
      myItemOrdered: {},
      showBookedMsg: false,

      dismissSecs: 1.8,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    handleClick() {
      this.myItemOrdered.id = this.myBookedItem._id
      this.myItemOrdered.name = this.myBookedItem.name
      this.myItemOrdered.quantity = this.orderQuantity
      this.myItemOrdered.shortcode = this.myBookedItem.shortcode
      if (this.myItemOrdered.quantity > 0) {
        this.dismissCountDown = this.dismissSecs
        this.$emit('fromSelectedWeight', this.myItemOrdered)
      }
      this.orderQuantity = 0
    },
  },

  computed: {

  },
}
</script>

<style scoped>

.minmax {
  border-radius: 20px;
  width: 60px;
  font-weight: 500;
}

.add-button {
  font-weight: bold;
  /* font-size: 16px !important; */
  letter-spacing: 1px;
  background-color: #fdc160;
  border-color: #fdc160;
  color: #28273d;
  border-radius: 12px;
  height: 30px;
  /* width: 120px; */
}

.availableWeight {
  font-size: 25px;
  font-weight: bold;
}

.bookedWeight {
  font-size: 16px;
}

/* booked alert */
.booked-enter-active {
  transition: all 0.3s ease;
}
.booked-leave-active {
  transition: all 0.8s ease;
}
.booked-enter,
.booked-leave-to {
  transform: translateX(10px);
  opacity: 0;
  transition: all 0.3s ease;
}

.sold-out {
  color: red;
}

.in-stock {
  color: green;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}

.spin-button {
  border-radius: 5px;
  width: 130px;
}
</style>
