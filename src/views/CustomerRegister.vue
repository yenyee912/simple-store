<template>
  <div class="container">
    <div class="row no-gutter">
      <div class="col-md-10 col-lg-6">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-md-10 col-lg-12 mx-auto">
                <h3 class="login-heading mb-4">Hello!</h3>
                <form @submit.prevent="register">
                  <b-row>
                    <b-col>
                      <div class="form-label-group">
                        <input
                          v-model="data.name"
                          type="name"
                          id="inputName"
                          class="form-control"
                          placeholder="Name"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputName">Name</label>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-label-group" style="margin-right: -10px">
                        <input
                          v-model="data.mobile"
                          type="text"
                          id="inputMobile"
                          class="form-control"
                          placeholder="Mobile Number"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputMobile"
                          >Mobile Number</label
                        >
                      </div>
                    </b-col>
                    <b-col>
                      <div class="form-label-group" style="margin-left: -10px">
                        <input
                          v-model="data.email"
                          type="email"
                          id="inputEmail"
                          class="form-control"
                          placeholder="Email address"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputEmail"
                          >Email Address</label
                        >
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div
                        class="form-label-group"
                        style="margin-right: -10px; margin-bottom: 5px;"
                      >
                        <input
                          v-model="data.password"
                          type="password"
                          id="inputPassword"
                          class="form-control"
                          placeholder="Password"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputPassword"
                          >Password</label
                        >
                      </div>
                    </b-col>
                    <b-col>
                      <div
                        class="form-label-group"
                        style="margin-left: -10px; margin-bottom: 5px;"
                      >
                        <input
                          v-model="data.password2"
                          type="password"
                          id="inputPassword2"
                          class="form-control"
                          placeholder="Confirm Password"
                          required
                        />
                        <label class="label-font" for="inputPassword2"
                          >Confirm Password</label
                        >
                      </div>
                    </b-col>
                  </b-row>

                  <hr
                    style="border-top: 1px dashed #2bb573; background-color: transparent;"
                  />

                  <b-row>
                    <b-col>
                      <div class="form-label-group" style="margin-top: 5px;">
                        <input
                          v-model="data.designation"
                          type="text"
                          id="inputdesignation"
                          class="form-control"
                          placeholder="Designation"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputdesignation"
                          >Designation</label
                        >
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-label-group" style="margin-bottom: 5px;">
                        <input
                          v-model="data.organization"
                          type="text"
                          id="inputorganization"
                          class="form-control"
                          placeholder="Organization"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputorganization"
                          >Organization</label
                        >
                      </div>
                    </b-col>
                  </b-row>

                  <!-- <hr style="border-top: 1px dotted white; margin-top: -4px; margin-bottom: 29px;"> -->
                  <hr
                    style="border-top: 1px dashed #2bb573; background-color: transparent;"
                  />

                  <b-row>
                    <b-col>
                      <div class="form-label-group" style="margin-top: 5px;">
                        <input
                          v-model="data.address1"
                          type="text"
                          id="inputaddress1"
                          class="form-control"
                          placeholder="Address"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputaddress1"
                          >Address 1</label
                        >
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-label-group" style="margin-right: -10px">
                        <input
                          v-model="data.address2"
                          type="text"
                          id="inputaddress2"
                          class="form-control"
                          placeholder="Address"
                          autofocus
                        />
                        <label class="label-font" for="inputaddress2"
                          >Address 2</label
                        >
                      </div>
                    </b-col>

                    <b-col>
                      <div class="form-label-group" style="margin-left: -10px">
                        <input
                          v-model="data.address3"
                          type="text"
                          id="inputaddress3"
                          class="form-control"
                          placeholder="Address"
                          autofocus
                        />
                        <label class="label-font" for="inputaddress3"
                          >Address 3</label
                        >
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <div class="form-label-group" style="margin-right: -10px">
                        <input
                          v-model="data.postcode"
                          type="text"
                          id="inputpostcode"
                          class="form-control"
                          placeholder="Postcode"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputpostcode"
                          >Postcode</label
                        >
                      </div>
                    </b-col>

                    <b-col>
                      <div
                        class="form-label-group"
                        style="margin-right: -10px; margin-left: -10px;"
                      >
                        <input
                          v-model="data.city"
                          type="text"
                          id="inputcity"
                          class="form-control"
                          placeholder="City"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputcity">City</label>
                      </div>
                    </b-col>
                    <b-col>
                      <div class="form-label-group" style="margin-left: -10px;">
                        <input
                          v-model="data.state"
                          type="text"
                          id="inputstate"
                          class="form-control"
                          placeholder="State"
                          required
                          autofocus
                        />
                        <label class="label-font" for="inputstate">State</label>
                      </div>
                    </b-col>
                  </b-row>

                  <b-button
                    class="btn btn-login-lg btn-warning btn-block btn-login text-uppercase font-weight-bold mb-2"
                    style="margin-top: 25px"
                    type="submit"
                    @submit="register"
                  >
                    Register</b-button
                  >
                  <div class="text-center" variant="danger">
                    <!-- <li v-for="(error, index) in errors" :key="index">{{ error }}</li> -->
                    <b-alert
                      v-for="(error, index) in errors"
                      :key="index"
                      show
                      variant="danger"
                      >{{ error.msg }}</b-alert
                    >
                  </div>
                  <div class="success-message text-center" v-if="showMsg">
                    <b-alert show variant="success">{{ successMsg }}</b-alert>
                  </div>
                  <div class="text-center" style="margin-top: 15px;">
                    <b-link to="/login" style="font-size: 14px;"
                      >Already have an account? Login here.</b-link
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: '',
        email: '',
        password: '',
        password2: '',
        designation: '',
        mobile: '',
        organization: '',
        address1: '',
        address2: '',
        address3: '',
        postcode: '',
        city: '',
        state: ''
      },
      errors: null,
      successMsg: 'Please verify your email',
      showMsg: false
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', this.data)
        .then(() => {
          this.showMsg = true
          // this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
          this.showMsg = false
          this.errors = err.response.data.errors
        })
    }
  }
}
</script>

<style>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login,
.image {
  min-height: 90vh;
}

.bg-image2 {
  background-image: url('/assets/home/plant-2-2.webp');
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

/* .btn-login {
  font-family: 'Nunito', 'Futura', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
} */

.form-label-group {
  /* font-family: 'Nunito', 'Futura', sans-serif; */
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: auto;
  border-radius: 2rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>
