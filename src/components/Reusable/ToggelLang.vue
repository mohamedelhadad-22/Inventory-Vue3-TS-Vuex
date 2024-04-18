<template>
    <label class="container">
        <input v-bind="$attrs" class="input" type="checkbox" :checked="checked" @change="$emit('update:checked', ($event.target as HTMLInputElement).checked)" />
        <div class="langname">
            {{ langname }}
        </div>
        <span class="switch"></span>
    </label>
</template>

<script lang="ts">
export default {
    name: "SwitchButton",
    props: {
        checked: {
            type: Boolean as () => any,
            required: true,
        },
    },
    computed: {
        langname(): string {
            return this.$i18n.locale
        },
    },
}
</script>

<style scoped>
.container {
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 50px;
}
.english .container {
    transition: all 1.5s ease-in-out;
    margin-left: 0;
    margin-right: 50px;
}
.label {
    margin-left: 12px;
    color: #1a202c;
    /* Show an ellipsis if the text takes more than one line */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/* Visually hide the checkbox input */
.input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
.switch {
    --switch-container-width: 50px;
    --switch-size: calc(var(--switch-container-width) / 2);
    --light-gray: #e2e8f0;
    --gray: #cbd5e0;
    --dark-gray: #a0aec0;
    /* Vertically center the inner circle */
    display: flex;
    align-items: center;
    position: relative;
    height: var(--switch-size);
    flex-basis: var(--switch-container-width);
    /* Make the container element rounded */
    border-radius: var(--switch-size);
    background-color: var(--Main-background-color);
    /* In case the label gets really long, the toggle shouldn't shrink. */
    flex-shrink: 0;
    transition: background-color 0.25s ease-in-out;
}
.switch::before {
    content: "";
    position: absolute;
    /* Move a little bit the inner circle to the right */
    left: 1px;
    height: calc(var(--switch-size) - 4px);
    width: calc(var(--switch-size) - 4px);
    /* Make the inner circle fully rounded */
    border-radius: 9999px;
    background-color: white;
    border: 2px solid var(--light-gray);
    transition: transform 0.375s ease-in-out;
}
.english .switch::before {
    left: calc(var(--switch-container-width) - var(--switch-size) - 1px);
    transition: transform 0.375s ease-in-out;
    transition: all 1.5s ease-in-out;
    transition: left 1.5s ease-in-out;
}
.input:checked + .switch {
    background-color: var(--background-hover);
}
.input:checked + .switch::before {
    border-color: var(--background-hover);
    /* Move the inner circle to the right */
    transform: translateX(calc(var(--switch-container-width) - var(--switch-size)));
}
.input:focus + .switch::before {
    border-color: var(--Main-background-color);
}
.input:focus:checked + .switch::before {
    border-color: var(--Main-background-color);
}
.input:disabled + .switch {
    background-color: var(--background-hover);
}
.input:disabled + .switch::before {
    background-color: var(--Main-background-color);
    border-color: var(--Main-background-color);
}

/* labng name swich */
.langname {
    position: absolute;
    right: 6px;
    top: 1px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    z-index: 1099999;
    text-transform: uppercase;
}
.english .langname {
    left: 4px;
    text-transform: uppercase;
}
</style>
