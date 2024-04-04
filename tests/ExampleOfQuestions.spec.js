import { mount } from '@vue/test-utils'
import ExampleOfQuestions from '@/components/parts/ExampleOfQuestions.vue'

describe('ExampleOfQuestions', () => {
    test('renders properly', () => {
        const wrapper = mount(ExampleOfQuestions)

        expect(wrapper.exists()).toBe(true)

        const logo = wrapper.find('.logo')
        expect(logo.exists()).toBe(true)
        expect(logo.attributes('src')).toEqual('../../public/chatgpt-logo.jpeg')
        expect(logo.attributes('alt')).toEqual('help-icon')

        const title = wrapper.find('h2')
        expect(title.exists()).toBe(true)
        expect(title.text()).toContain('How can I help you today?')

        const questions = wrapper.findAll('.questions-block')
        expect(questions.length).toBeGreaterThan(0)

        const firstQuestion = questions[0]
        firstQuestion.trigger('click')

        expect(wrapper.vm.userMessages.getChatTree).toHaveBeenCalledWith('Give me ideas')
    })
})