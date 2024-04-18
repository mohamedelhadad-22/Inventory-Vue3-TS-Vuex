import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import SignUpVue from "../authentication pages/SignUp.vue"

describe("SignUp", () => {
    it("renders properly", () => {
        const $t = (key: any) => key // mock $t function
        const wrapper = mount(SignUpVue, {
            global: {
                mocks: {
                    $t,
                },
            },
        })

        expect(wrapper.vm.$t("WelcomeToDarah")).toBe("WelcomeToDarah")
    })
})
