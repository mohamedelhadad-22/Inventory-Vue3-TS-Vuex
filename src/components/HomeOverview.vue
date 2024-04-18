<template>
    <div class="home_page">
        <h1>{{ $t("Overview") }}</h1>
        {{ $t("LogintoyourKPIDashboard") }}
        <ModalComponent @Close="toggelModal" :modalActive="modalActive">
            <div class="modal-content">
                <h1>this is modal for darah</h1>
                <p>this is modal message</p>
            </div>
        </ModalComponent>
        <button @click="toggelModal" class="button-open-modal">Open Modal</button>
        <br />
    </div>
</template>

<script lang="ts">
// import { useLanguageService } from "@/LanguageService"
import ModalComponent from "./Reusable/ModalComponent.vue"
import { ref } from "vue"
export default {
    name: "HomePage",
    components: { ModalComponent },
    setup() {
        // const { translatedText } = useLanguageService()
        const modalActive = ref(false)


    const toggelModal = () => {
      modalActive.value = !modalActive.value
    }


        return {
            // translatedText,
            modalActive,
            toggelModal,
        }
    },

}
</script>

<style scoped>
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-content p,
.modal-content h1 {
  margin-bottom: 16px;
}
.modal-content h1 {
  font-size: 32px;
}
.modal-content p {
  font-size: 19px;
}

.button-open-modal {
  padding: 20px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  outline: none;
  cursor: pointer;
  border: 1px solid#5757bc;
  color: #5757bc;
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.5s ease-in-out;
}
.button-open-modal:hover {
  transition: all 0.5s ease-in-out;
  background-color: #5757bc;
  color: #fff;
}
</style>
