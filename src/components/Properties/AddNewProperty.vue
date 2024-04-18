<template>
  <div class="add_new_property">
    <nav>
      <h1>New Property</h1>
      <p>please fill the form below to know more about the property</p>
    </nav>
    <hr />
    <section class="addprperty_form">
      <div class="addprperty_form-stepper">
        <div class="step_box">
          <span
            class="step"
            :class="{ 'step-active': newProperty.step === 1, 'step-done': newProperty.step > 1 }"
            >1</span
          >
          <span class="step_name">General information</span>
        </div>
        <div class="step_box">
          <span
            class="step setinner"
            :class="{ 'step-active': newProperty.step === 2, 'step-done': newProperty.step > 2 }"
          >
            <div class="step_point"></div>
            <div class="step_number">2</div>
          </span>
          <span class="step_name">Address</span>
        </div>

        <div class="step_box">
          <span
            class="step setinner"
            :class="{ 'step-active': newProperty.step === 3, 'step-done': newProperty.step > 3 }"
          >
            <div class="step_point"></div>

            <div class="step_number">3</div>
          </span>
          <span class="step_name">Ownership</span>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <section v-show="newProperty.step === 1" class="steps">
          <div class="addprperty_form-title">
            <h1>Let's add your property</h1>
          </div>
          <form class="form form_steps" method="post" action="#" @submit.prevent="next">
            <div class="form-group step-one">
              <label for="PropertyName">Property Name</label>
              <input
                id="PropertyName"
                type="text"
                v-model="newProperty.name"
                placeholder="Property name"
                :class="{ invalid: v$?.name?.$error }"
              />
              <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                <span class="error" v-if="err.$property == 'name'">
                  <transition name="fade" mode="out-in">
                    {{ err.$message }}
                  </transition>
                </span>
              </span>
            </div>
            <div class="property_type">
              <div class="propertytype_text">
                <h2>Property Type</h2>
                <p>Which kind of property do you manage?</p>
              </div>
              <div class="box_type">
                <div
                  v-for="option in propertyTypeOptions"
                  :key="option.value"
                  @click="selectOption(option.value)"
                  :class="option.value === newProperty.type ? option.value : 'proptype'"
                >
                  <component :is="option.icon" />
                  {{ option.label }}
                </div>
              </div>

              <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                <span class="error" v-if="err.$property == 'type'">
                  {{ err.$message }}
                </span>
              </span>
            </div>

            <div class="paginations_steps">
              <button class="btn_next" type="submit">Next</button>
              <router-link to="/properties" class="btn_cancel"> Cancel </router-link>
            </div>
          </form>
        </section>
      </transition>
      <transition name="fade" mode="out-in">
        <section v-show="newProperty.step === 2" class="steps">
          <div class="addprperty_form-title">
            <h1>Property address</h1>
            <p>What's the property address?</p>
          </div>
          <form class="form form_address" method="post" action="#" @submit.prevent="next">
            <div class="input_two">
              <div class="address-group">
                <label for="Street1"> Street1</label>
                <input
                  type="text"
                  v-model="newProperty.street1"
                  placeholder="Street1"
                  id="Street1"
                />
                <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                  <span class="error" v-if="err.$property == 'street1'">
                    {{ err.$message }}
                  </span>
                </span>
              </div>
              <div class="address-group">
                <label for="Street2">Street2</label>
                <input
                  type="text"
                  placeholder="Street2"
                  v-model="newProperty.street2"
                  id="Street2"
                />
                <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                  <span class="error" v-if="err.$property === 'street2'">
                    {{ err.$message }}
                  </span>
                </span>
              </div>
            </div>
            <div class="address-group">
              <label for="Country">Country</label>
              <input type="text" v-model="newProperty.country" placeholder="Country" id="Country" />
              <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                <span class="error" v-if="err.$property == 'country'">
                  {{ err.$message }}
                </span>
              </span>
            </div>
            <div class="address-group">
              <label for="City">City</label>
              <input type="text" v-model="newProperty.city" placeholder="City" id="City" />
              <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                <span class="error" v-if="err.$property == 'city'">
                  {{ err.$message }}
                </span>
              </span>
            </div>
            <div class="address-group">
              <label for="ZipCode">Zip Code</label>
              <input
                type="text"
                v-model="newProperty.zip_code"
                placeholder="Zip Code"
                id="ZipCode"
                :class="{ invalid_input: v$?.zip_code?.$error }"
              />
              <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                <span class="error" v-if="err.$property == 'zip_code'">
                  {{ err.$message }}
                </span>
              </span>
            </div>
            <div class="address-group cta-step">
              <div class="cta prev">
                <p class="cta-color">
                  <span class="link_wrap">
                    <!-- <a class="link_text" href="#" @click.prevent="prev()"
                      ><span class="arrow-prev"></span>Previous
                    </a> -->
                  </span>
                </p>
              </div>
            </div>
            <div class="paginations_steps">
              <button class="btn_next" type="submit">Next</button>
              <button class="btn_cancel" @click.prevent="prev()">Back</button>
            </div>
          </form>
        </section>
      </transition>
      <transition name="fade" mode="out-in">
        <section v-show="newProperty.step === 3" class="steps">
          <div class="addprperty_form-title">
            <h1>Property Ownership</h1>
            <p>
              Information about the company owners, co-founders or other important personnels who
              run the business
            </p>
          </div>
          <form class="form form_address">
            <div class="input_two">
              <div class="address-group">
                <label for="FirstName"> First Name</label>
                <input
                  type="text"
                  v-model="newProperty.ownerFirstName"
                  placeholder="First Name"
                  id="Street1"
                />
                <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                  <span class="error" v-if="err.$property == 'ownerFirstName'">
                    {{ err.$message }}
                  </span>
                </span>
              </div>
              <div class="address-group">
                <label for="LastName">Last Name</label>
                <input
                  type="text"
                  v-modal="newProperty.ownerLastName"
                  placeholder="Last Name"
                  id="LastName"
                  :class="{ invalid_input: v$?.ownerLastName?.$error }"
                />
                <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                  <span class="error" v-if="err.$property == 'ownerLastName'">
                    {{ err.$message }}
                  </span>
                </span>
              </div>
            </div>
            <div class="address-group">
              <label for="Email Address">Email Address</label>
              <input
                type="email"
                v-model="newProperty.owner_email"
                placeholder="Email Address"
                id="Email Address"
                :class="{ invalid_input: v$?.owner_email?.$error }"
              />
              <span class="invalid-error" v-for="err in v$.$errors" :key="err.$uid">
                <span class="error" v-if="err.$property == 'owner_email'">
                  {{ err.$message }}
                </span>
              </span>
            </div>

            <div class="address-group">
              <label for="Description">Description</label>
              <textarea
                name="Description"
                v-modal="newProperty.description"
                id="Description"
                rows="5"
              ></textarea>
            </div>
            <div class="paginations_steps">
              <button class="btn_next" type="button" @click="addNewProperty(newProperty)">
                Finish
              </button>
              <button class="btn_cancel" @click.prevent="prev()">Back</button>
            </div>
          </form>
        </section>
      </transition>
    </section>

    <ModalComponent @Close="toggelModal" :modalActive="modalActive" class="added_modal">
      <div class="addproperty_modal">
        <div class="icon_box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M8.7487 14L12.2487 17.5L19.2487 10.5M25.6654 14C25.6654 20.4433 20.442 25.6666 13.9987 25.6666C7.55538 25.6666 2.33203 20.4433 2.33203 14C2.33203 7.55666 7.55538 2.33331 13.9987 2.33331C20.442 2.33331 25.6654 7.55666 25.6654 14Z"
              stroke="#344054"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h1>Property Added</h1>
        <p>A new property has been added successfully.</p>
        <div class="gototable">
          <router-link to="/properties" class="btn_next"> Done </router-link>
        </div>
      </div>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import CustomCheckbox from '../Reusable/CustomCheckbox.vue'
import { ref, computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import CommercialIcon from '@/assets/icons/CommercialIcon.vue'
import ResidentialIcon from '@/assets/icons/ResidentialIcon.vue'
import ModalComponent from '../Reusable/ModalComponent.vue'
import type { newProperty } from '@/models/DataTableItem'
import { useStore } from 'vuex'
export default {
  name: 'newProperty',
  components: { CustomCheckbox, ModalComponent, CommercialIcon, ResidentialIcon },
  data() {
    return {
      store: useStore()
    }
  },

  setup() {
    const propertyTypeOptions = [
      { value: 'commercial', label: 'Commercial', icon: CommercialIcon },
      { value: 'residential', label: 'Residential', icon: ResidentialIcon }
    ]
    const selectOption = (option: string) => {
      newProperty.type = option
    }

    const modalActive = ref(false)

    const toggelModal = () => {
      modalActive.value = !modalActive.value
    }

    const newProperty = reactive({
      step: 1,
      steps: {},
      type: '',
      street1: '',
      street2: '',
      country: '',
      city: '',
      zip_code: '',
      ownerName: '',
      owner_email: '',
      description: '',
      name: '',
      ownerFirstName: '',
      ownerLastName: ''
    } as newProperty)

    const rules = computed(() => {
      if (newProperty.step === 1) {
        return {
          name: {
            required: helpers.withMessage('This field is required.', required),
            minLength: minLength(3)
          },
          type: { required: helpers.withMessage('This field is required.', required) }
        }
      }
      if (newProperty.step === 2) {
        return {
          street1: {
            required: helpers.withMessage('This field is required.', required),
            minLength: minLength(3)
          },
          street2: {
            required: helpers.withMessage('This field is required.', required),
            minLength: minLength(3)
          },
          country: { required: helpers.withMessage('This field is required.', required) },
          city: { required: helpers.withMessage('This field is required.', required) },
          zip_code: { required, minLength: minLength(4) }
        }
      } else {
        return {
          street1: { required },
          street2: { required },
          country: { required },
          city: { required },
          zip_code: { required },
          ownerFirstName: { required: helpers.withMessage('This field is required.', required) },
          // ownerLastName: { required: helpers.withMessage('This field is required.', required) },
          owner_email: { required: helpers.withMessage('This field is required.', required), email }
        }
      }
    })

    const v$ = useVuelidate(rules, newProperty)

    return {
      propertyTypeOptions,
      selectOption,
      modalActive,
      toggelModal,
      newProperty,
      v$
    }
  },
  methods: {
    next() {
      this.v$.$validate()
      if (!this.v$.$error) {
        console.log('form validation successful')
        this.newProperty.step++
        console.log('newProperty', this.newProperty.step.valueOf())
      } else {
        console.log('form validation failed')
      }
    },
    prev() {
      this.newProperty.step--
    },
    async addNewProperty(newProperty: newProperty) {
      this.v$.$validate()
      if (!this.v$.$error) {
        console.log('form validation successful')
        await this.store.dispatch('addNewproperty', newProperty)
        console.log('new property added', newProperty)
        // toggle modal
        this.toggelModal()
        console.log('newProperty', this.newProperty.step.valueOf())
      } else {
        console.log('form validation failed')
      }
    }
  }
}
</script>

<style scoped>
.add_new_property {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 94dvh;
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
.addprperty_form-title {
  display: flex;
  margin-top: 20px;
  flex-direction: column;

  /* gap: 8px; */
}
.addprperty_form-title h1 {
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  color: #101828;
}

.addprperty_form-stepper {
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  margin: 0 auto;
  align-items: center;
}
.addprperty_form-stepper::before {
  z-index: 0;
  content: '';
  display: block;
  position: absolute;
  height: 2px;
  width: calc(66% - 20px);
  top: calc(50% - 12px);
  background: #cecece;
}
.addprperty_form-stepper .step {
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 16px;
  z-index: 22;
  border: 2px solid #eaecf0;
  transition: all 0.4s;
}
.setinner {
  box-shadow: inset 0 0 10px 10px #fff;
  transition: all 0.4s;
}
.step_box {
  display: flex;
  flex-direction: column;
  z-index: 22;
  align-items: center;
  /* flex-wrap: wrap; */
  width: calc(100% / 3);
  transition: all 0.4s;
}
.step_point {
  display: flex;
  width: 16px;
  height: 16px;
  border-radius: 100px;
  background: #eaecf0;
}
.step_number {
  font-size: 14px;
  font-weight: 600;
  display: none;
  transition: all 0.4s;
}
.addprperty_form-stepper .step-active {
  border: 2px solid #5757bc;
  transition: all 0.4s;
  background: #5757bc;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  box-shadow: none;
}
.step-active .step_point {
  display: none;
}
.step-active .step_number {
  display: flex;
  color: #fff;
}
.addprperty_form-stepper .step-done {
  border: 2px solid #5757bc;
  background: #5757bc;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.4s;
  box-shadow: none;
}
.addprperty_form-stepper .step-done .step_point {
  display: none;
}
.addprperty_form-stepper .step-done .step_number {
  display: flex;
  color: #fff;
}
.addprperty_form-stepper .step-done .setinner {
  box-shadow: none;
}

/* Property Type Style */
.property_type {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 16px;
}
.property_type .propertytype_text {
  text-align: center;
  margin-bottom: 1rem;
}
.propertytype_text h2 {
  font-size: 20px;
  font-weight: 600;
  color: #101828;
}
.propertytype_text p {
  font-size: 16px;
  font-weight: 500;
  color: #475467;
}
.form-group {
  display: flex;
  flex-flow: row;
  gap: 4px;
}

/* Steps Style */
.addprperty_form {
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  margin-top: 26px;
  height: 100%;
}
.steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
}
input {
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  display: flex;
  height: 44px;
  padding: 10px 14px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.paginations_steps {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-top: auto;
}
.btn_next {
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #5757bc;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}
.btn_cancel {
  display: flex;
  padding: 12px 18px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex: 1 0 0;
  border-radius: 4px;
  border: 1px solid #d0d5dd;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  color: #101828;
  font-size: 16px;
  font-weight: 600;
}
.form_steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 16px;
  height: 84%;
}
.form_steps .step-one {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 50%;
}
.step-one label {
  font-size: 14px;
  font-weight: 400;
  color: #182230;
}
.box_type {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 16px;
}
.proptype {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ced3ef;
  background: #fff;
  transition: all 0.3s ease-in-out;
}
.commercial {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #f3f3fb;
}
.residential {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #5757bc;
  background: #f3f3fb;
}
/* Start Address Form */
.form_address {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
  margin: 16px 0 0 0;
}
.input_two {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
}
.address-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-bottom: 16px;
}
.address-group label {
  font-size: 14px;
  font-weight: 400;
  color: #182230;
}
.address-group input {
  padding: 10px 14px;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.address-group textarea {
  display: flex;
  padding: 12px 14px;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #f2f4f7;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
/* End Address Form */

/* Modal Style */
.addproperty_modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100%;
}
.addproperty_modal h1 {
  font-size: 24px;
  font-weight: 600;
  color: #101828;
}
.addproperty_modal p {
  font-size: 16px;
  font-weight: 400;
  color: #475467;
  text-align: center;
}
.icon_box {
  display: flex;
  width: 56px;
  height: 56px;
  padding: 14px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #eaecf0;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.gototable {
  width: 100%;
}
.addproperty_modal .btn_next {
  width: 100%;
}

.invalid_input {
  border: 1px solid #ff0000;
}
</style>

<style>
.added_modal .modal-content {
  max-width: 360px;
  gap: 24px;
  width: 100%;
  z-index: 193094;
}
hr {
  border: 1px solid#E3E5F6;
}
</style>
