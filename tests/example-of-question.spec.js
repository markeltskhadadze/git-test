import { createTestingPinia } from '@pinia/testing'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { examplesOfQuestion } from '~/stores/questions-example'

describe('examplesOfQuestion', () => {
    it('returns an array of examples', () => {
        const pinia = createTestingPinia()

        pinia.use(examplesOfQuestion)

        const FakeComponent = defineComponent({
            template: `<div></div>`,
            setup() {
                const store = examplesOfQuestion()

                return {
                    store
                }
            }
        })

        const wrapper = mount(FakeComponent, {
            global: {
                plugins: [pinia.plugin]
            }
        })

        expect(wrapper.vm.store.examples).toHaveLength(4)
    })
})
