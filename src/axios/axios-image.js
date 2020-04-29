import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        common: {
            'x-api-key': "e850ec96-1840-4063-890d-fef52b5e5f2c"
        }
    }
})