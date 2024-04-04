import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { TMessageExample } from '~/types'

export const examplesOfQuestion = defineStore('examplesOfQuestion', () => {
    const examples= reactive<TMessageExample[]>([
        {
            title: 'Give me ideas',
            description: 'about how to plan my New Years resolutions'
        },
        {
            title: 'Compare storytelling techniques',
            description: 'in novels and in films'
        },
        {
            title: 'Plan an itinerary',
            description: 'for a literary tour of England, visiting famous authors homes'
        },
        {
            title: 'Brainstorm names',
            description: 'for a non-alcoholic cocktail with Coke and pomegranate syrup'
        }
    ])

    return {
        examples
    }
})