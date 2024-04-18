<template>
    <div ref="otpCont">
        <input
            type="text"
            class="digit-box"
            v-for="(el, ind) in digits"
            :key="el ? el + ind : ind"
            v-model="digits[ind]"
            :autofocus="ind === 0"
            placeholder="0"
            maxlength="1"
            @keydown="handleKeyDown($event, ind)"
            :class="{ bounce: digits[ind] !== '' }"
        />
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
import { ref, reactive } from "vue"

const props = defineProps({
    default: String,
    digitCount: {
        type: Number,
        required: true,
    },
})

const digits = reactive<string[]>(Array(props.digitCount).fill(""))

const otpCont = ref<HTMLDivElement | null>(null)

const emit = defineEmits(["update:otp"])

const isDigitsFull = function () {
    for (const elem of digits) {
        if (elem === "") {
            return false
        }
    }

    return true
}

const handleKeyDown = function (event: KeyboardEvent, index: number) {
    if (event.key !== "Tab" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
        event.preventDefault()
    }

    if (event.key === "Backspace") {
        digits[index] = ""

        if (index != 0) {
            ;(otpCont.value?.children[index - 1] as HTMLDivElement)?.focus()
        }

        return
    }

    if (new RegExp("^([0-9])$").test(event.key)) {
        digits[index] = event.key

        if (index != props.digitCount - 1) {
            ;(otpCont.value?.children[index + 1] as HTMLDivElement)?.focus()
        }

        if (isDigitsFull()) {
            emit("update:otp", digits.join(""))
        }
    }
}
</script>

<style scoped>
.digit-box {
    height: 4rem;
    width: 4rem;
    border: 2px solid #5757bc;
    display: inline-block;
    border-radius: 5px;
    margin: 5px;
    padding: 15px;
    font-size: 3rem;
}
.digit-box:focus {
    outline: 3px solid #5757bc;
}
input[type="text"] {
    text-align: center;
    color: #5757bc;
}

.bounce {
    animation: pulse 0.3s ease-in-out alternate;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.1);
    }
}
</style>
