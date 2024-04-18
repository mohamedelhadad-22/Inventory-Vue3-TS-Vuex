<template>
    <div class="add_new_property">
      <nav>
        <h1>New Property</h1>
        <p>please fill the form below to know more about the property</p>
      </nav>
      <hr />
      <section class="addprperty_form" v-if="!hasSeenCongrats">
        <div class="addprperty_form-stepper">
          <div class="step" :class="{ 'step-active': step === 1, 'step-done': step > 1 }">
            <span class="step-number">1</span>
          </div>
          <div class="step" :class="{ 'step-active': step === 2, 'step-done': step > 2 }">
            <span class="step-number">2</span>
          </div>
          <div class="step" :class="{ 'step-active': step === 3, 'step-done': step > 3 }">
            <span class="step-number">3</span>
          </div>
        </div>
        <h1 class="addprperty_form-title">Let's add your property</h1>
  
        <transition name="slide-fade">
          <section v-show="step === 1">
            <form class="form" method="post" action="#" @submit.prevent="next">
              <div class="form-group">
                <label for="PropertyName">Property Name</label>
                <input
                  id="PropertyName"
                  type="text"
                  v-model="customer.firstName"
                  autocomplete="customer.firstName"
                  placeholder="First name"
                  required
                />
              </div>
              <div class="property_type">
                <div class="propertytype_text">
                  <h2>Property Type</h2>
                  <p>Which kind of property do you manage?</p>
                </div>
                <div class="form-group">
                <input id="loyaltyCivilityMr" type="radio" value="1" v-model="customer.gender" />
                <label class="input-label" for="loyaltyCivilityMr">Mr.</label>
  
                <input id="loyaltyCivilityMrs" type="radio" value="2" v-model="customer.gender" />
                <label class="input-label" for="loyaltyCivilityMrs">Mrs.</label>
              </div>
              </div>
  
              <div
                class="cta"
                data-style="see-through"
                data-alignment="right"
                data-text-color="custom"
              >
                <p class="cta-color">
                  <span class="link_wrap">
                    <input type="submit" value="Next" class="link_text" />
                    <span class="arrow-next"></span>
                  </span>
                </p>
              </div>
            </form>
          </section>
        </transition>
        <transition name="slide-fade">
          <section v-show="step === 2">
            <form class="form" method="post" action="#" @submit.prevent="next">
              <div class="form-group">
                <input
                  type="text"
                  v-model="customer.address"
                  autocomplete="customer.address"
                  placeholder="Address"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  v-model="customer.zipCode"
                  autocomplete="customer.zipCode"
                  placeholder="Zip Code"
                  minlength="5"
                  maxlength="5"
                  required
                />
                <input
                  type="text"
                  v-model="customer.city"
                  autocomplete="customer.city"
                  placeholder="City"
                  required
                />
              </div>
  
              <div class="form-group cta-step">
                <div class="cta prev">
                  <p class="cta-color">
                    <span class="link_wrap">
                      <a class="link_text" href="#" @click.prevent="prev()"
                        ><span class="arrow-prev"></span>Previous
                      </a>
                    </span>
                  </p>
                </div>
                <div class="cta">
                  <p class="cta-color">
                    <span class="text"></span>
                    <span class="link_wrap">
                      <input type="submit" value="Next" class="link_text" />
                      <span class="arrow-next"></span>
                    </span>
                  </p>
                </div>
              </div>
            </form>
          </section>
        </transition>
        <transition name="slide-fade">
          <section v-show="step === 3">
            <form class="form" action="#" @submit.prevent="customeraddprperty_form">
              <div class="form-group">
                <input
                  type="email"
                  v-model="customer.eMail"
                  autocomplete="customer.eMail"
                  placeholder="Email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  type="date"
                  v-model="customer.birthDay"
                  placeholder="Birthday ('day'/'month'/'year')"
                  required
                />
              </div>
  
              <div class="form-group cta-step">
                <div class="cta prev">
                  <p class="cta-color">
                    <span class="link_wrap">
                      <a class="link_text" href="#" @click.prevent="prev()"
                        ><span class="arrow-prev"></span>Previous
                      </a>
                    </span>
                  </p>
                </div>
              </div>
              <div class="addprperty_form-btn">
                <input type="submit" value="Welcom to form" />
              </div>
            </form>
          </section>
        </transition>
      </section>
  
      <section class="congrats addprperty_form" v-if="hasSeenCongrats">
        <div class="addprperty_form-icon">
          <img
            class="addprperty_form-icon-item"
            src="https://vuejs.org/images/logo.png"
            alt="vue logo"
          />
        </div>
        <h2 class="congrats-title">Thank you !</h2>
        <p class="congrats-subtitle">
          You have successfully created your account and joined the<br />
          <strong>VueJS<br />multiple steps form</strong>
        </p>
      </section>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'MultiStepForm',
    components: {},
    data() {
      return {
        steps: {},
        step: 1,
        customer: {
          gender: '1',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          zipCode: '',
          city: '',
          birthDay: '',
          termOfService: '',
          pinCode: '',
          eMail: ''
        },
        hasSeenCongrats: false,
        tempCustomer: {
          gender: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          zipCode: '',
          city: '',
          birthDay: '',
          termOfService: '',
          pinCode: '',
          eMail: ''
        }
      }
    },
    computed: {},
    methods: {
      prev() {
        this.step--
      },
  
      next() {
        this.step++
      },
  
      customeraddprperty_form: function () {
        this.hasSeenCongrats = true
      }
    }
  }
  </script>
  
  <style scoped>
  .add_new_property {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .add_new_property nav {
    margin-bottom: 20px;
  }
  .add_new_property h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  .add_new_property p {
    font-size: 1rem;
    color: #666;
  }
  .add_new_property hr {
    border: 1px solid #e3e5f6;
    width: 100%;
  }
  
  /* Start Form Style */
  .pen-description {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .pen-description h1 {
    text-align: center;
    margin-top: 2rem;
    color: #000;
  }
  .pen-description p {
    margin: 0;
    line-height: 1;
  }
  .pen-description .pen-copyright img {
    border-radius: 25px;
    padding: 5px;
    margin: 5px;
    transition: box-shadow 0.5s ease-in-out;
  }
  .pen-description .pen-copyright:hover img {
    box-shadow: 0 10px 20px #0e2101;
  }
  .addprperty_form {
    display: block;
    color: #000;
    width: 100%;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 4rem;
  }
  .addprperty_form-title {
    font-size: 1.5rem;
    text-align: center;
    color: #777;
    margin-top: 2rem;
  }
  .addprperty_form-stepper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: relative;
    margin: 0 auto 1.5em;
  }
  .addprperty_form-stepper::before {
    z-index: 0;
    content: '';
    display: block;
    position: absolute;
    height: 2px;
    top: calc(50% - 1px);
    background: #cecece;
    width: calc(100% - 20px);
  }
  .addprperty_form-stepper .step {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border: 2px solid #cecece;
    color: #000;
    background-color: #fff;
    border-radius: 50%;
    min-width: 25px;
    min-height: 25px;
    line-height: 20px;
    font-size: 16px;
  }
  .addprperty_form-stepper .step-active {
    color: #000;
    background-color: #fff;
    border-color: #999;
  }
  .addprperty_form-stepper .step-done {
    color: #000;
    border-color: #5757bc;
  }
  .addprperty_form-stepper .step-number {
    font-weight: 800;
    line-height: 1;
    vertical-align: middle;
  }
  .property_type {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
  }
  .property_type .propertytype_text {
    text-align: center;
    margin-bottom: 1rem;
  }
  .addprperty_form .form-group {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  .addprperty_form .form-group label {
    text-align: left;
    font-size: 1.1rem;
    line-height: 1.1;
    padding-bottom: 0.5rem;
  }
  .addprperty_form .form-group.cta-step {
    color: #000;
    justify-content: space-between;
  }
  .addprperty_form .form-group.cta-step .cta.prev {
    padding: 10px 30px;
  }
  .addprperty_form .form-group.new-password {
    margin-top: 2rem;
  }
  .addprperty_form .form .cta-color,
  .addprperty_form .form .cta-color input,
  .addprperty_form .form .cta-color .link_text {
    color: #000;
    font-size: 1.1rem;
    text-decoration: none;
  }
  .addprperty_form .form .cta-color .link_wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .addprperty_form .form .cta-color .link_wrap .arrow-prev {
    position: relative;
    display: inline-block;
    transform: translate(0);
    transition: transform 0.3s ease-in-out;
  }
  .addprperty_form .form .cta-color .link_wrap .arrow-prev::before {
    content: '<';
    position: absolute;
    top: -17px;
    left: -25px;
  }
  .addprperty_form .form .cta-color .link_wrap .arrow-next {
    position: relative;
    display: inline-block;
    transform: translate(0);
    transition: transform 0.3s ease-in-out;
  }
  .addprperty_form .form .cta-color .link_wrap .arrow-next::before {
    content: '>';
    position: absolute;
    top: -10px;
    left: -25px;
  }
  .addprperty_form .form .cta-color .link_wrap:hover .arrow-prev {
    transform: translate(-5px);
  }
  .addprperty_form .form .cta-color .link_wrap:hover .arrow-next {
    transform: translate(5px);
  }
  .addprperty_form input[type='submit'],
  .addprperty_form input[type='text'],
  .addprperty_form input[type='tel'],
  .addprperty_form input[type='email'],
  .addprperty_form input[type='date'] {
    -webkit-appearance: none;
    border: 0;
    border-radius: 5px;
    padding: 1.3rem 1rem;
    width: 100%;
    margin: 0.5rem;
  }
  .addprperty_form input[type='submit'] {
    cursor: pointer;
    position: relative;
    padding-right: 36px;
    background: none;
    width: fit-content;
  }
  .addprperty_form input[type='submit']:hover,
  .addprperty_form input[type='submit']:focus {
    box-shadow: unset;
    transform: none;
  }
  .addprperty_form input[type='submit']::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    border-radius: 50px;
    border: 1px solid #00c4b5;
    height: 25px;
    width: 25px;
    margin-top: -14px;
    pointer-events: none;
    transition: all 0.33s cubic-bezier(0.12, 0.75, 0.4, 1);
  }
  .addprperty_form-btn input {
    color: #000;
    font-size: 1.2rem;
    font-weight: 800;
    line-height: 1;
    width: fit-content;
    transition: all 0.3s ease;
  }
  .addprperty_form-btn input:hover {
    background: linear-gradient(145deg, #173205, #1b3c05);
  }
  .addprperty_form .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .addprperty_form .slide-fade-leave-active {
    display: none;
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .addprperty_form .slide-fade-enter,
  .addprperty_form .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .congrats {
    background: #fff;
    color: #5757bc;
    padding: 4rem;
    text-align: center;
  }
  .congrats-subtitle {
    line-height: 1.3;
  }
  .congrats-subtitle strong {
    font-size: 2rem;
  }
  </style>
  