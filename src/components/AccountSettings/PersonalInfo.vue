<template>
    <div class="personal_info">
        <Transition name="fade">
            <div class="presonalInfp_page" v-show="ChangeEmailActive">
                <div class="settings_row">
                    <div class="user_upluade_imge">
                        <div class="userinfo-img">
                            <img :src="userImage" alt="User Image" class="userimg" />
                        </div>
                        <form class="uploader">
                            <input id="file-upload" type="file" name="fileUpload" accept="image/*" @change="onFileChange" />
                            <label for="file-upload" id="file-drag">
                                <div>
                                    <div>
                                        <img src="../../assets/svg/Featuredicon.svg" alt="" />
                                    </div>
                                    <p>
                                        <span id="file-upload-btn" class="btn">Select a file</span>
                                        <span>or drag and drop</span>
                                        <span class="filetype">PNG, JPG (max. 170x170px)</span>
                                    </p>
                                </div>
                            </label>
                        </form>
                    </div>
                    <div class="account_username">
                        <ReusableInput placeholder="mohamed" v-model="userinfo.FirstName" @input="checkForm" class="username_input" :label="FirstNameLabel" />
                        <ReusableInput placeholder="Elhadad" v-model="userinfo.LastName" @input="checkForm" class="username_input" :label="LastNameLabel" />
                    </div>

                    <div class="account-email">
                        <ReusableInput placeholder="olivia@untitledui.com" type="email" class="username_input" :label="emailLabel" v-model="userinfo.email" @input="checkForm" disabled />
                        <button class="btn_emailchange" @click="navigateToChangeEmail">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g clip-path="url(#clip0_1769_14)">
                                    <path
                                        d="M9.16699 3.33333H5.66699C4.26686 3.33333 3.5668 3.33333 3.03202 3.60582C2.56161 3.8455 2.17916 4.22795 1.93948 4.69836C1.66699 5.23314 1.66699 5.9332 1.66699 7.33333V14.3333C1.66699 15.7335 1.66699 16.4335 1.93948 16.9683C2.17916 17.4387 2.56161 17.8212 3.03202 18.0609C3.5668 18.3333 4.26686 18.3333 5.66699 18.3333H12.667C14.0671 18.3333 14.7672 18.3333 15.302 18.0609C15.7724 17.8212 16.1548 17.4387 16.3945 16.9683C16.667 16.4335 16.667 15.7335 16.667 14.3333V10.8333M6.66697 13.3333H8.06242C8.47007 13.3333 8.6739 13.3333 8.86571 13.2873C9.03577 13.2465 9.19835 13.1791 9.34747 13.0877C9.51566 12.9847 9.65979 12.8405 9.94804 12.5523L17.917 4.58334C18.6073 3.89298 18.6073 2.77369 17.917 2.08333C17.2266 1.39298 16.1073 1.39298 15.417 2.08333L7.44802 10.0523C7.15977 10.3405 7.01564 10.4847 6.91257 10.6529C6.82119 10.802 6.75385 10.9646 6.71302 11.1346C6.66697 11.3264 6.66697 11.5303 6.66697 11.9379V13.3333Z"
                                        stroke="#344054"
                                        stroke-width="1.66667"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1769_14">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Change Email
                        </button>
                    </div>

                    <div class="account-phone">
                        <ReusableInput placeholder="+966 00-000-0000" type="number" class="username_input" v-model="userinfo.phone" @input="checkForm" :label="phoneLabel" />
                    </div>

                    <div class="save_profile">
                        <button class="btn_save_info" :disabled="checkForm?.length === 0" @click="saveUser" :class="buttonClass">Save Profile</button>
                    </div>
                    <div class="delete_account">
                        <div class="settings-titels">
                            <h4 class="info-title">Delete Account</h4>
                            <p>Permanently delete your account.</p>
                        </div>
                        <button class="btn-danger" @click="modaldeleteAccount()">Delete Account</button>
                        <ModalComponent @Close="toggelModal" :modalActive="modalActive" class="modal_deleteAccount">
                            <div class="deleteAccount_form">
                                <div class="deleteAccount_icon">
                                    <div class="svg_box">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                            <path
                                                d="M18.6667 6.99967V6.06634C18.6667 4.75955 18.6667 4.10616 18.4123 3.60703C18.1886 3.16799 17.8317 2.81103 17.3926 2.58733C16.8935 2.33301 16.2401 2.33301 14.9333 2.33301H13.0667C11.7599 2.33301 11.1065 2.33301 10.6074 2.58733C10.1683 2.81103 9.81136 3.16799 9.58765 3.60703C9.33333 4.10616 9.33333 4.75955 9.33333 6.06634V6.99967M11.6667 13.4163V19.2497M16.3333 13.4163V19.2497M3.5 6.99967H24.5M22.1667 6.99967V20.0663C22.1667 22.0265 22.1667 23.0066 21.7852 23.7553C21.4496 24.4139 20.9142 24.9493 20.2556 25.2849C19.5069 25.6663 18.5268 25.6663 16.5667 25.6663H11.4333C9.47315 25.6663 8.49306 25.6663 7.74437 25.2849C7.0858 24.9493 6.55037 24.4139 6.21481 23.7553C5.83333 23.0066 5.83333 22.0265 5.83333 20.0663V6.99967"
                                                stroke="#D92D20"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <h1>Deleting account</h1>
                                    <p>Deleting your account will remove all of your information from our database, Please enter your password to confirm you would like to permanently</p>
                                </div>
                                <div class="password-input">
                                    <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password" />
                                    <!-- <EyeIcon class="icon" :visible="showPassword" @click="togglePasswordVisibility" />
                  <EyeIcon class="icon" :visible="showPassword" @click="togglePasswordVisibility" /> -->
                                    <div class="icon">
                                        <EyeIcon class="" :open="showPassword" @click="togglePasswordVisibility" />
                                    </div>
                                </div>
                                <button class="btn-delete" @click="deleteAccount()">Delete Account</button>
                                <button class="btn-primary" @click="toggelModal()">Cancel</button>
                            </div>
                        </ModalComponent>
                    </div>
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-show="showChangeEmail" class="changemailcomponent">
                <ChangeEmail @closChangeEmail="navigateToChangeEmail" />

                <!-- <ChangeEmail showChangeEmail="toggleChangeEmailVisibility" /> -->
            </div>
        </Transition>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import defaultImageIcon from "./../../assets/icons/defaultImage.Icon.vue"
import ReusableInput from "../authentication pages/ReusableInput.vue"
import ChangeEmail from "./ChangeEmail.vue"
import ModalComponent from "../ModalComponent.vue"
import EyeIcon from "@/assets/icons/CloseIcon.vue"
export default defineComponent({
    name: "PersonalInfo",
    components: {
        ReusableInput,
        ChangeEmail,
        ModalComponent,
        EyeIcon,
    },
    data() {
        return {
            FirstNameLabel: "First Name",
            LastNameLabel: "Last Name",
            phoneLabel: "Phone number",
            emailLabel: "Email Address",
            email: "",
            errorMsg: "",
            ChangeEmailActive: true,
            showChangeEmail: false,
            modalActive: ref(false),
            showPassword: false,
            password: "",
            visible: {
                type: Boolean,
                required: true,
            },
            userinfo: {
                FirstName: "",
                LastName: "",
                email: "",
                phone: "",
            },
            formIsValid: false,
        }
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
                this.userinfo.FirstName.trim() !== "" ||
                this.userinfo.LastName.trim() !== "" ||
                //  this.userinfo.email.trim() !== '' ||
                this.userinfo.phone.trim() !== ""
            if (this.userinfo.phone.trim() !== "") {
                const phoneRegex = /^(\+)?([0-9]{10,15})$/
                this.formIsValid = this.formIsValid && phoneRegex.test(this.userinfo.phone)
            }
        },
        saveUser() {
            // Save user data here
        },
        navigateToChangeEmail() {
            this.showChangeEmail = true
            this.ChangeEmailActive = false
            console.log("navigateToChangeEmail")
        },
        toggelModal() {
            this.modalActive = !this.modalActive
        },
        modaldeleteAccount() {
            // this.$router.push({ path: 'deleteaccount' })
            // logout user and redirect to login page
            console.log("delete account")
            this.toggelModal()
        },
        deleteAccount() {
            // delete account
            console.log("delete account")
        },
        // toggle Password Visibility
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        },
    },
    setup() {
        const userImage = ref<any>(defaultImageIcon)

        const onFileChange = (event: Event) => {
            const target = event.target as HTMLInputElement
            const file: File = (target.files as FileList)[0]

            const reader = new FileReader()
            reader.onloadend = () => {
                userImage.value = reader.result as string
            }
            reader.readAsDataURL(file)
        }

        return {
            userImage,
            onFileChange,
        }
    },
})
</script>

<style scoped>
.presonalInfp_page {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 0 0 0;
}
.back {
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 34px;
    cursor: pointer;
}
.settings_row {
    display: flex;
    flex-direction: column;
    margin: 0 0 1.5rem 0;
    padding: 0rem 0 1.5rem 0;
    width: 70%;
    min-height: 86dvh;
}

.user-image-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6%;
    width: 70%;
}
.settings-titels {
    display: flex;
    flex-direction: column;
    width: 40%;
}

.user_upluade_imge {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 16px;
}

.image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.userinfo-img {
    border-radius: 200px;
    border: 0.75px;
    width: 76px;
    height: 76px;
    flex-shrink: 0;
    margin-left: 20px;
}
.userimg {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}
.uploader {
    display: flex;
    gap: 16px;
    width: 100%;
}
.uploader label {
    width: 100%;
    padding: 2rem 1.5rem;
    text-align: center;
    border-radius: 4px;
    border: 2px solid #e3e5f6;
    background: #fff;
    transition: all 0.4s ease;
    user-select: none;
}
.uploader label:hover {
    border-color: #454cad;
}
.uploader label.hover {
    border: 3px solid #454cad;
    box-shadow: inset 0 0 0 6px #eee;
}
.uploader #file-image.hidden {
    display: none;
}

.uploader input[type="file"] {
    display: none;
}

.uploader .btn {
    display: inline-block;
    font-weight: 700;
    font-size: 14px;
    padding: 0 1rem;
    color: var(--Main-background-color);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}
.uploader .filetype {
    display: block;
}
.account-email,
.account-phone,
.account_username {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
}
.account-email .btn_emailchange {
    cursor: pointer;
    width: 30%;
    display: flex;
    margin-top: 14px;
    height: 44px;
    padding: 10px 14px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 4px;
    border: 1px solid #d0d5dd;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    color: #344054;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    margin-right: 12px;
}
.english .btn_emailchange {
    margin-right: 0;
    margin-left: 12px;
}
.username_input {
    width: 100%;
}
.account_username .username_input:first-child {
    margin-left: 16px;
}
.english .account_username .username_input:first-child {
    margin-right: 16px;
    margin-left: 0;
}
.row-delete {
    margin-top: 70px;
    border-bottom: 0;
    border-top: 1px solid #eaecf0;
}
.row-email {
    border-bottom: 0;
}
.info-title {
    color: var(--Base-Dark);
    font-size: 14px;
    font-weight: 600;
}
.settings-titels p {
    color: #475467;
    font-size: 14px;
    font-weight: 400;
}
.english .userinfo-img {
    margin-left: 0;
    margin-right: 20px;
}
.error-msg {
    color: #ff0000;
    font-size: 14px;
    font-weight: 400;
}
.deleteAccount_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}
.password-input {
    position: relative;
    display: inline-block;
}

.password-input input {
    border-radius: 4px;
    border: 1px solid #f2f4f7;
    background: #fff;
    height: 44px;
    padding: 10px 30px 10px 14px;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.password-input .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    cursor: pointer;
}
.deleteAccount_icon {
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
    border-radius: 4px;
    border: 1px solid #fee4e2;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    margin-bottom: 24px;
}

.deleteAccount_form .btn-delete {
    width: 100%;
    color: #f04438;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
}
.btn-primary {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #d0d5dd;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    color: #101828;
    font-weight: 600;
    font-size: 14px;
}
.save_profile {
    margin-top: 10px;
    margin-bottom: 24px;
}
.btn_save_info {
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
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: #98a2b3;
    transition: all 0.4s ease-in-out;
}
.btn_save_info.enabled {
    border: 1px solid #454cad;
    background: #454cad;
    color: #fff;
}
.delete_account {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    margin-top: auto;
}

.changemailcomponent {
    width: 70%;
    min-height: 86dvh;
}

/* Start Media Query Css Code */

/* X-Small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
    .settings_row {
        width: 100%;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    .settings_row {
        width: 100%;
    }
    .account-email .btn_emailchange {
        width: 40%;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .settings_row {
        width: 100%;
    }
    .account-email .btn_emailchange {
        width: 40%;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
    .settings_row {
        width: 100%;
    }
    .account-email .btn_emailchange {
        width: 33%;
    }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
}

/* XX-Large devices (larger desktops) */
</style>

/* This is Global css for components */
<style>
.username_input .forminput {
    border-radius: 4px;
    border: 1px solid #f2f4f7;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    display: flex;
    height: 44px;
    padding: 10px 14px;
    align-items: center;
    gap: 8px;
    overflow: hidden;
    color: #0c111d;
    font-size: 16px;
    font-weight: 400;
    transition: all 0.4s ease-in-out;
}
.username_input .forminput:focus {
    border-radius: 4px;
    border: 1px solid #d6bbfb;
    background: #fff;
    box-shadow: 0px 0px 0px 4px rgba(87, 87, 188, 0.24), 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
    transition-delay: 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    transition: opacity 0.5s ease;
    opacity: 0;
}

.modal_deleteAccount .modal-content {
    display: flex;
    width: 360px;
    max-width: 360px;
    padding: 30px 20px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
}
.modal_deleteAccount .button-close-modal {
    display: none;
}
</style>
