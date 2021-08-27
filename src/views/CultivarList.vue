<template>
  <div>
    <div class="m-4">
      <h2 class="title-order">Cultivar List</h2>
    </div>

    <b-row class="no-margin text-center">
      <b-col
        v-for="x in cultivars"
        class="mb-4 mt-4 no-margin"
        :key="x.id"
        cols="4"
      >
        <b-card
          no-body
          class="pr-2 pl-2 card-design"
          :img-src="'/assets/card/' + x.id + '.webp'"
          :img-width="350"
          :img-height="280"
        >
          <h3 class="harvest-name">{{ x.name }}</h3>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cultivars: [],
    }
  },

  methods: {
    async getCultivarList() {
      const x = await axios.get(`${process.env.VUE_APP_ROOT_API}/cultivars`)
      try {
        x.data.data.shift()
        this.cultivars = x.data.data
      } catch (err) {
        console.log(err.message)
      }
    },
  },

  mounted() {
    this.getCultivarList()
  },
}
</script>


<style scoped>
img {
  margin-top: 15px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 15px;
}

.card-design {
  border-radius: 5px;
  display: inline-block;
  max-width: 20rem;
  border-radius: 12px;
  border: none;
  box-shadow: 1px 3px 20px rgb(10, 10, 10, 0.08);
}

.harvest-name {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #28273d;
}

.no-margin {
  margin-left: 0px;
  margin-right: 0px;
}

.image {
  width: 150px;
  max-width: 100%;
  margin-top: 10px;
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
</style>