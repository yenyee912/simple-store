<template>
  <div>
    <div>
      <b-jumbotron class="jumbo" text-variant="light">
        <template v-slot:header>
          <strong>About Us</strong>
        </template>
        <template v-slot:lead>
          <b>
            Our aim is to inspire communities to eat cleaner greens.
            <br />No chemicals, no nasties. <br />Just clean and packed with
            flavour.
          </b>
        </template>
      </b-jumbotron>
    </div>
  </div>
</template>

<style scoped>
.jumbo {
  background-image: url('/assets/home/plant-1-2.webp');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 0px;

  width: 100%;
  height: 100%;
}
.jumbo > h1 {
  padding-top: 10rem;
}

.container-fluid > .container-fluid {
  padding-top: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
}

.container > .mt-4 > .card > .card-body > h4 {
  padding-top: 30px;
}
</style>
