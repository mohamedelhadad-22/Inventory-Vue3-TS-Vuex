<template>
    <div class="signup-page">
        <form @submit.prevent class="singupform">
            <div v-if="state.currentStep === 1" class="step">
                <div class="form-info">
                    <h1>{{ $t("CreateAnAccount") }}</h1>
                    <p>{{ $t("freetrial") }}</p>
                </div>
                <div class="form-control">
                    <label for="FullName"> {{ $t("FullName") }} </label>
                    <ReusableInput id="FullName" v-model="state.fullName" type="text" :placeholder="$t('FullName')" required />
                    <span class="invalid-error" v-if="v$?.fullName?.$error">
                        {{ v$?.fullName?.$errors[0]?.$message }}
                    </span>
                </div>
                <div class="form-control">
                    <label for="email">{{ $t("email") }}:</label>
                    <input id="email" v-model="state.email" type="email" :placeholder="$t('email')" required />
                    <span class="invalid-error" v-if="v$?.email?.$error">
                        {{ v$?.email?.$errors[0]?.$message }}
                    </span>
                </div>
                <button type="button" class="form-next" @click="nextStep()">
                    {{ $t("Next") }}
                </button>
            </div>

            <div v-else-if="state.currentStep === 2">
                <div class="form-info">
                    <h1>Add a password</h1>
                </div>
                <div class="form-control">
                    <label for="password">Password:</label>
                    <input id="password" v-model="state.password" type="password" required />
                    <span class="invalid-error" v-if="v$?.password?.$error">
                        {{ v$?.password?.$errors[0]?.$message }}
                    </span>
                </div>
                <div class="form-control">
                    <label for="confirmPassword">Confirm password:</label>
                    <input id="confirmPassword" v-model="state.confirmPassword" type="password" required />
                    <span class="invalid-error" v-if="v$?.confirmPassword?.$error">
                        {{ v$?.confirmPassword?.$errors[0]?.$message }}
                    </span>
                </div>
                <button type="button" class="form-next" @click="nextStep()">Sign in</button>
            </div>

            <div v-else-if="state.currentStep === 3">
                <div class="form-info">
                    <h1>Check your email</h1>
                    <p>Enter the OTP sent to olivia@untitledui.com</p>
                </div>
                <div class="form-control">
                    <OTP :digit-count="6" @update:otp="otpValue = $event" class="otp"></OTP>
                </div>
                <button type="submit" @click="checkOTP()" class="form-submit">Sign in</button>
                <p :style="{ color: messageColor }">{{ message }}</p>
            </div>
            <div v-else-if="state.currentStep === 4">
                <div class="form-info">
                    <h1>Welcome to Darah!</h1>
                    <p>Email verified has been successfully</p>
                    <RouterLink to="/login" class="form-next">Login to the dashboard</RouterLink>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import ReusableInput from "./ReusableInput.vue"
import OTP from "./OTP.vue"
import { useVuelidate } from "@vuelidate/core"
import { required, email, sameAs, minLength } from "@vuelidate/validators"
import { computed, reactive } from "vue"
// import { useLanguageService } from "@/LanguageService"
import { ref } from "vue"

export default {
    name: "SignUp",
    components: {
        ReusableInput,
        OTP,
    },
    data() {
        return {
            // newinput: ReusableInput
            reuseinput1: ref(""),
            reuseinput2: ref(""),
            reuseinput3: ref(""),
            otpValue: ref(""),
            otp: "",
            message: "",
            messageColor: "",
            testOTP: 123456,
        }
    },
    // Compostion API
    setup() {
        const state = reactive({
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            emailOtp: "number",
            currentStep: 1,
        })

        const rules = computed(() => {
            if (state.currentStep === 1) {
                return {
                    email: { required, email },
                    fullName: { required },
                }
            }
            if (state.currentStep === 2) {
                return {
                    password: { required, minLengthValue: minLength(6) },
                    confirmPassword: {
                        required,
                        sameAs: sameAs(state.password),
                    },
                }
            }
            return {
                email: { required, email },
                fullName: { required },
                password: { required },
                confirmPassword: {
                    required,
                    sameAs: sameAs(state.password),
                },
            }
        })

        const v$ = useVuelidate(rules, state)

        // const { translatedText } = useLanguageService()

        // Use translatedText in your component
        return {
            state,
            // translatedText,
            v$,
        }
    },
    methods: {
        nextStep() {
            this.v$.$validate()
            if (!this.v$.$error) {
                console.log("form validation successful")
                this.state.currentStep++
            } else {
                console.log("form validation failed")
            }
        },
        checkOTP() {
            if (Number(this.otpValue) === this.testOTP) {
                // replace '123456' with your actual OTP
                this.message = "OTP is correct"
                this.messageColor = "green"
                this.state.currentStep++
            } else {
                this.message = "OTP is incorrect"
                this.messageColor = "red"
            }
        },
    },
}
</script>

<style scoped>
.signup-page {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
}
.singupform {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.singupform .form-info {
    text-align: center;
}
.singupform .form-info h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}
.singupform .form-info p {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1rem;
}
.form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.form-control label {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
}
.form-control input {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    outline: none;
    margin-bottom: 10px;
}
.form-submit,
.form-next {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #5757bc;
    border: 1px solid #ccc;
    outline: none;
    margin-bottom: 10px;
    cursor: pointer;
    color: #fff;
    width: 100%;
}
.otp {
    color: #5757bc;
}
.step {
    width: 20%;
}
input[type="text"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
}

button {
    background-color: #5757bc;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
}

#message {
    color: red;
}

.form-next {
    background-color: #5757bc;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
}
</style>
