<template>
  <footer class="footer-main bd-footer text-muted docs-border">
    <div class="container footer-container">
      <div class="row justify-content-center">
        <div
          class="text-center text-sm-right col-sm order-sm-3 col-12"
        >
          <img
            src="../assets/logo.png"
            width="80"
            class="mb-4 mt-sm img-fluid"
          />
        </div>
        <div class="text-left col-md-3 col-auto">
          <h5 class="font-title bd-text-purple-bright mb-1">
            Documentation
          </h5>
          <ul class="list-unstyled ml-3">
            <li>
              <b-link to="/" class="hover">Home</b-link>
            </li>
            <li>
              <b-link to="/" class="hover">Book</b-link>
            </li>
          </ul>
        </div>
        <div class="text-left col-md-3 col-auto">
          <h5 class="font-title bd-text-purple-bright mb-1" data-v-04436b78>
            Our Site
          </h5>
          <ul class="list-unstyled ml-3" >
            <li>
              <a
                href="https://www.google.com/"
                class="hover"
                target="_blank"
                >Site</a
              >
            </li>
          </ul>
        </div>
        <div class="text-left col-md-3 col-auto" data-v-04436b78>
          <h5 class="font-title bd-text-purple-bright mb-1" data-v-04436b78>
            Find Us
          </h5>
          <ul
            class="list-unstyled ml-3"
            style="font-size: 14px; margin-right: -25px"
            data-v-04436b78
          >
            <p target="_blank" data-v-04436b78>
              Lorem ipsum dolor sit amet consectetur, 
              adipisicing elit. 
              Ea, error rerum adipisci debitis amet cupiditate quibusdam. 
            </p>
          </ul>
          <h5 class="font-title bd-text-purple-bright mb-1" data-v-04436b78>
            Phone Us
          </h5>
          <ul class="list-unstyled ml-3" data-v-04436b78>
            <div style="font-size: 14px; margin-right: -20px">
              +603 - 1111 1111
            </div>
          </ul>
        </div>
      </div>
      <hr data-v-04436b78 />
      <p class="font-credits mb-2" data-v-04436b78>
        Designed and built
        <br />
        with love
      </p>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style>
.footer-main {
  /* background-color: #7fd3a1; */
  background-color: #28273d;
  /* margin-top: 100px; */
}

.footer-container {
  background-color: #28273d;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 30px;
  padding-left: 15px;
  /* margin-top: 100px; */
  margin-right: auto;
  margin-left: auto;
}
.bd-footer a {
  background-color: #28273d;
  font-size: 15px;
  font-weight: 400;
  /* letter-spacing: px; */
  color: #7fd3a1;
  font-family: 'Nunito', 'Futura', sans-serif;
}

.ml-3 {
  font-weight: 400;
  color: #7fd3a1;
  font-family: 'Nunito', 'Futura', sans-serif;
}

.font-title {
  font-family: 'Nunito', 'Futura', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: .6px;
  color: lightgray;
}

/* .font-details {
  font-size: 18px;
  margin-right: -10px;
} */

.font-credits {
  font-family: 'Nunito', 'Futura', sans-serif;
  font-size: 14px;
  color: darkgray;
}

.hover:hover {
  color: #fdc160 !important;
}

hr {
  background-color: gray;
}
</style>
