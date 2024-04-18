<template>
    <div class="company_detailsPage">
        <form class="company_details" @submit.prevent>
            <ReusableInput type="text" class="input-form currentemail" :placeholder="$t('CompanyName')" :label="CompanyNameLabel" v-model="state.CompanyName" required @input="checkForm" />
            <p class="invalid-error" v-if="v$?.CompanyName?.$error">
                {{ v$?.CompanyName?.$errors[0]?.$message }}
            </p>
            <ReusableInput type="text" class="input-form" :placeholder="$t('JobTitle')" v-model="state.JobTitle" :label="JobTitleLabel" @input="checkForm" />
            <p class="invalid-error" v-if="v$?.JobTitle?.$error">
                {{ v$?.JobTitle?.$errors[0]?.$message }}
            </p>
            <div class="company_form-control">
                <ReusableInput class="confirmnewemail input-form" v-model="state.PrimaryEmail" type="email" :placeholder="$t('PrimaryEmail')" :label="PrimaryEmailAddressLabel" @input="checkForm" />
                <p class="invalid-error" v-if="v$?.PrimaryEmail?.$error">
                    {{ v$?.PrimaryEmail?.$errors[0]?.$message }}
                </p>
                <ReusableInput type="number" class="Yourpassword input-form" :label="PrimaryNumberLabel" :placeholder="$t('PrimaryNumber')" v-model="state.PrimaryNumber" @input="checkForm" />
                <p class="invalid-error" v-if="v$?.PrimaryNumber?.$error">
                    {{ v$?.PrimaryNumber?.$errors[0]?.$message }}
                </p>
            </div>
            <div class="company_form-control">
                <ReusableInput type="text" class="input-form" :label="StreetOneLabel" :placeholder="$t('StreetOne')" v-model="state.StreetOne" @input="checkForm" />
                <p class="invalid-error" v-if="v$?.StreetOne?.$error">
                    {{ v$?.StreetOne?.$errors[0]?.$message }}
                </p>
                <ReusableInput type="text" class="input-form" :label="StreetTowLabel" :placeholder="$t('StreetTow')" v-model="state.StreetTow" @input="checkForm" />
                <p class="invalid-error" v-if="v$?.StreetTow?.$error">
                    {{ v$?.StreetTow?.$errors[0]?.$message }}
                </p>
            </div>
            <div class="company_form-control">
                <ReusableInput type="text" class="input-form" :label="CountryLabel" :placeholder="$t('Country')" v-model="state.Country" @input="checkForm" />
                <p class="invalid-error" v-if="v$?.Country?.$error">
                    {{ v$?.Country?.$errors[0]?.$message }}
                </p>
                <ReusableInput type="text" class="input-form" :label="CityLAbel" :placeholder="$t('City')" @input="checkForm" v-model="state.City" />
                <p class="invalid-error" v-if="v$?.City?.$error">
                    {{ v$?.City?.$errors[0]?.$message }}
                </p>
            </div>
            <div class="company_form-control">
                <ReusableInput type="number" class="input-form" :label="VTANumberLabel" :placeholder="$t('VTANumber')" v-model="state.VTANumber" @input="checkForm" />
                <ReusableInput type="text" class="input-form" :label="PostcodeLabel" :placeholder="$t('Postcode')" v-model="state.Postcode" @input="checkForm" required />
                <p class="invalid-error" v-if="v$?.Postcode?.$error">
                    {{ v$?.Postcode?.$errors[0]?.$message }}
                </p>
            </div>
            <div class="buttons-wrapper">
                <button class="btn_primary_save" :class="buttonClass" :disabled="checkForm?.length === 0" @click="submit()">Save</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"
import { reactive, computed } from "vue"
import ReusableInput from "../authentication pages/ReusableInput.vue"
export default {
    name: "CompanyDetails",
    components: { ReusableInput },
    data() {
        return {
            CompanyNameLabel: "Company Name",
            JobTitleLabel: "Job Title",
            PrimaryEmailAddressLabel: "Primary Email Address",
            PrimaryNumberLabel: "Primary Number",
            StreetOneLabel: "Street Address 1",
            StreetTowLabel: "Street Address 2",
            CountryLabel: "Country",
            CityLAbel: "City",
            PostcodeLabel: "Postcode",
            VTANumberLabel: "VTA Number",
            formIsValid: false,
        }
    },
    setup() {
        const state = reactive({
            CompanyName: "",
            JobTitle: "",
            PrimaryEmail: "",
            PrimaryNumber: "",
            StreetOne: "",
            StreetTow: "",
            Country: "",
            City: "",
            Postcode: "",
            VTANumber: "",
        })
        const rules = computed(() => {
            return {
                CompanyName: { required },
                JobTitle: { required },
                PrimaryEmail: { required, email },
                PrimaryNumber: { required },
                StreetOne: { required },
                StreetTow: { required },
                Country: { required },
                City: { required },
                Postcode: { required },
                VTANumber: { required },
            }
        })
        const v$ = useVuelidate(rules, state)
        return { state, v$ }
    },
    computed: {
        buttonClass() {
            return {
                enabled: this.formIsValid,
            }
        },
    },
    methods: {
        checkForm() {
            this.formIsValid =
                this.state.CompanyName.trim() !== "" ||
                this.state.JobTitle.trim() !== "" ||
                this.state.StreetOne.trim() !== "" ||
                this.state.StreetTow.trim() !== "" ||
                this.state.Country.trim() !== "" ||
                this.state.City.trim() !== "" ||
                this.state.Postcode.trim() !== "" ||
                this.state.PrimaryEmail.trim() !== "" ||
                this.state.VTANumber.trim() !== ""
            if (this.state.PrimaryNumber.trim() !== "") {
                const phoneRegex = /^(\+)?([0-9]{10,15})$/
                this.formIsValid = this.formIsValid && phoneRegex.test(this.state.PrimaryNumber)
            }
            if (this.state.PrimaryEmail.trim() !== "") {
                const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                this.formIsValid = this.formIsValid && emailRegex.test(this.state.PrimaryEmail)
            }
        },

        submit() {
            this.v$.$validate()
            // Save user data here
        },
    },
}
</script>
<style scoped>
.company_detailsPage {
    width: 100%;
}
.company_details {
    width: 70%;
    transition: all 0.5s ease-in-out;
}
.company_form-control {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    align-items: center;
    width: 100%;
}

.company_form-control .input-wrap {
    margin-right: 20px;
    width: 100%;
}
.btn_primary_save {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #eaecf0;
    background: #f2f4f7;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    padding: 12px 18px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    cursor: not-allowed;
    color: #98a2b3;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.5s ease-in-out;
}

.enabled {
    border: 1px solid #454cad;
    background: #454cad;
    color: #fff;
    cursor: pointer;
}

/* Start Media Query Css Code */

/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
    .company_details {
        width: 100%;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    .company_details {
        width: 100%;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .company_details {
        width: 100%;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
    .company_details {
        width: 100%;
    }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}

/* XX-Large devices (larger desktops) */
</style>
<style>
.company_details .forminput {
    margin-bottom: 1rem;
    display: block;
    border-radius: 4px;
    border: 1px solid #f2f4f7;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    height: 44px;
    padding: 10px 14px;
    gap: 8px;
    color: #98a2b3;
    font-size: 16px;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
}
.company_form-control .input-wrap label {
    color: #182230;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 4px;
}
</style>
