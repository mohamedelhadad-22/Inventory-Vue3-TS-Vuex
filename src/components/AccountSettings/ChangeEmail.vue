<template>
    <div class="changeEmail_page">
        <form class="form-changemail" @submit.prevent>
            <ReusableInput type="text" class="changeemail_input" :placeholder="$t('currentemail')" :label="currentemail" v-model="state.currentemail" required @input="changeemail" />
            <Transition name="fade">
                <span class="invalid-error" v-if="v$?.currentemail?.$error">
                    {{ v$?.currentemail?.$errors[0]?.$message }}
                </span>
            </Transition>

            <ReusableInput type="email" class="changeemail_input" :placeholder="$t('email')" v-model="state.Newemail" :label="newemail" @input="changeemail" />
            <Transition name="fade">
                <span class="invalid-error" v-if="v$?.Newemail?.$error">
                    {{ v$?.Newemail?.$errors[0]?.$message }}
                </span>
            </Transition>

            <ReusableInput
                class="changeemail_input input-form"
                v-model="state.confirmnewemail"
                type="email"
                :placeholder="$t('confirmnewemail')"
                required
                :label="confirmnewemail"
                @input="changeemail"
            />
            <Transition name="fade">
                <span class="invalid-error" v-if="v$?.confirmnewemail?.$error">
                    {{ v$?.confirmnewemail?.$errors[0]?.$message }}
                </span>
            </Transition>

            <ReusableInput type="password" class="changeemail_input input-form" :label="Yourpassword" :placeholder="$t('Yourpassword')" v-model="state.password" @input="changeemail" />
            <Transition name="fade">
                <span class="invalid-error" v-if="v$?.password?.$error">
                    {{ v$?.password?.$errors[0]?.$message }}
                </span>
            </Transition>

            <div class="buttons-wrapper">
                <button class="btn_primary_submit" :disabled="passwordValid ? false : true" :class="buttonClass" @click="changeemail()">Submit</button>
                <button class="btn_primary_cancel" @click="$emit('showChangeEmail', $event.target)">Cancel</button>
                <!-- <button class="btn_primary_cancel" @click="showChangeEmail">Cancel</button> -->
            </div>
        </form>

        <ModalComponent @Close="toggelModal" :modalActive="modalActive" class="modal-changeemail">
            <div v-if="state.currentStep === 1" class="step">
                <div class="emailchanged_icon">
                    <div class="svg_box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path
                                d="M2.3335 8.1665L11.8592 14.8345C12.6306 15.3745 13.0163 15.6445 13.4358 15.749C13.8064 15.8414 14.194 15.8414 14.5645 15.749C14.984 15.6445 15.3697 15.3745 16.1411 14.8345L25.6668 8.1665M7.9335 23.3332H20.0668C22.027 23.3332 23.0071 23.3332 23.7558 22.9517C24.4144 22.6161 24.9498 22.0807 25.2854 21.4221C25.6668 20.6734 25.6668 19.6934 25.6668 17.7332V10.2665C25.6668 8.30632 25.6668 7.32623 25.2854 6.57754C24.9498 5.91897 24.4144 5.38354 23.7558 5.04798C23.0071 4.6665 22.027 4.6665 20.0668 4.6665H7.9335C5.97331 4.6665 4.99322 4.6665 4.24453 5.04798C3.58596 5.38354 3.05053 5.91897 2.71497 6.57754C2.3335 7.32623 2.3335 8.30632 2.3335 10.2665V17.7332C2.3335 19.6934 2.3335 20.6734 2.71497 21.4221C3.05053 22.0807 3.58596 22.6161 4.24453 22.9517C4.99322 23.3332 5.97331 23.3332 7.9335 23.3332Z"
                                stroke="#344054"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <h1>Email Changed</h1>
                    <p>Your email address has been changed successfully. Click below to log in.</p>
                </div>
                <OTP :digitCount="4" @update:otp="otpValue = $event" />
                <button type="submit" @click="checkOTP()" class="otp-submit">Check Email</button>
                <p :style="{ color: OTPmessageColor }">{{ OTPmessage }}</p>
                <p class="resend_text">
                    Didn’t receive the email?
                    <a class="btn-resend" @click="changeemail()">Click to resend</a>
                </p>
            </div>

            <div v-else-if="state.currentStep === 2" class="step">
                <div class="emailChangedMSG">
                    <div class="emailchanged_icon">
                        <div class="svg_box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path
                                    d="M8.75016 14.0002L12.2502 17.5002L19.2502 10.5002M25.6668 14.0002C25.6668 20.4435 20.4435 25.6668 14.0002 25.6668C7.55684 25.6668 2.3335 20.4435 2.3335 14.0002C2.3335 7.55684 7.55684 2.3335 14.0002 2.3335C20.4435 2.3335 25.6668 7.55684 25.6668 14.0002Z"
                                    stroke="#344054"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <h1>Email Changed</h1>
                        <p>Your email address has been changed successfully. Click below to log in.</p>
                    </div>
                    <button class="checkuseremail">Login</button>
                </div>
            </div>
        </ModalComponent>
    </div>
</template>
<script lang="ts">
import useVuelidate from "@vuelidate/core"
import { required, email, minLength, sameAs } from "@vuelidate/validators"
import ModalComponent from "../Reusable/ModalComponent.vue"
import OTP from "../authentication pages/OTP.vue"
import { reactive, computed, ref } from "vue"
import ReusableInput from "../authentication pages/ReusableInput.vue"
export default {
    name: "PersonalInfo",
    components: {
        ReusableInput,
        ModalComponent,
        OTP,
    },
    data() {
        return {
            otpValue: ref(""),
            otp: "",
            OTPmessage: "",
            OTPmessageColor: "",
            testOTP: 1234,
            currentemail: "Current Email",
            newemail: "New Email",
            confirmnewemail: "Confirm New Email",
            Yourpassword: "Your password",
            modalActive: ref(false),
            currentStep: 1,
            formIsValid: false,
            passwordValid: false,
        }
    },
    // add message for input validation error
    setup() {
        const state = reactive({
            Newemail: "",
            currentemail: "",
            password: "",
            confirmPassword: "",
            emailOtp: "number",
            confirmnewemail: "",
            currentStep: 1,
        })

        const rules = computed(() => {
            if (state.currentStep === 1) {
                return {
                    Newemail: { required, email },
                    confirmnewemail: {
                        required,
                        sameAs: sameAs(state.Newemail),
                    },
                    currentemail: { required, email },
                    password: { required, minLengthValue: minLength(6) },
                }
            }
            return {
                Newemail: { required, email },
                confirmnewemail: {
                    required,
                    sameAs: sameAs(state.Newemail),
                },
                currentemail: { required, email },
                password: { required, minLengthValue: minLength(6) },
            }
        })
        const v$ = useVuelidate(rules, state)

        // modal open
        return { state, v$ }
    },
    computed: {
        buttonClass() {
            return {
                enabled: this.passwordValid,
            }
        },
    },
    methods: {
        toggelModal() {
            this.modalActive = !this.modalActive
        },
        // use vyelidate to validate input
        changeemail() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.passwordValid = true
                console.log(this.passwordValid, "form validation successful")
                this.toggelModal()
            } else {
                console.log("error")
                this.passwordValid = false
            }
        },
        // check OTP
        checkOTP() {
            if (Number(this.otpValue) === this.testOTP) {
                // replace '123456' with your actual OTP
                this.OTPmessage = "OTP is correct"
                this.OTPmessageColor = "green"
                this.state.currentStep++
            } else {
                this.OTPmessage = "OTP is incorrect"
                this.OTPmessageColor = "red"
                console.log("this is otp vlaue", this.otpValue)
            }
        },
    },
}
</script>
<style scoped>
.form-changemail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
}

.changeemail_input {
    width: 100%;
    transition: all 0.3s ease-in-out;
}

.btn-primary {
    margin-left: 10px;
}
.modal-changeemail {
    display: flex;
    justify-content: center;
    align-items: center;
}
.checkuseremail,
.otp-submit {
    margin-top: 20px;
    justify-content: center;
    width: 100%;
    background-color: var(--Main-background-color);
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
}
.closeicon {
    color: #5757bc;
}
.emailchanged_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 24px;
    text-align: center;
}
.svg_box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid #eaecf0;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    margin-bottom: 24px;
}
.resend_text {
    margin-top: 24px;
    color: #475467;
    font-size: 14px;
    font-weight: 400;
}
.btn-resend {
    color: #000;
    font-size: 14px;
    font-weight: 600;
}

.buttons-wrapper {
    display: flex;
    margin-top: 24px;
    gap: 10px;
    width: 100%;
}
.buttons-wrapper .btn_primary_submit {
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
    color: #98a2b3;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.5s ease-in-out;
}
.btn_primary_submit.enabled {
    background-color: var(--Main-background-color);
    color: #fff;
}
.buttons-wrapper .btn_primary_cancel {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #d0d5dd;
    background: #fff;
    color: #101828;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    cursor: pointer;
}
</style>

<style>
.form-changemail .changeemail_input .forminput {
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
.form-changemail label {
    font-size: 14px;
    font-weight: 500;
    display: block;
    color: #344054;
    margin-bottom: 6px;
}

.modal-changeemail .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 360px;
    height: 454px;
    max-width: 360px;
    padding: 20px;
}
.modal-changeemail .button-close-modal {
    display: none;
}
</style>
