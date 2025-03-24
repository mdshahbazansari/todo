import axios from 'axios'
const baseUrl = import.meta.env.BASE_URL
axios.defaults.baseURL = baseUrl

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default fetcher
