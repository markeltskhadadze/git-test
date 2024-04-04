import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            // Устанавливаем алиас для '~', который будет указывать на корневую директорию проекта
            // Это позволит нам использовать '~' для импорта файлов из корневой директории проекта
            '~': path.resolve(__dirname, './')
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
    },
})