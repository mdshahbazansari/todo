import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default fetcher
