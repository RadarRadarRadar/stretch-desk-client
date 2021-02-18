import apiUrl from '../apiConfig'
import axios from 'axios'

export const stretchIndex = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/stretches/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const stretchShow = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/stretch/' + id + '/',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const stretchAdd = (stretch, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/stretches/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      stretch: {
        name: stretch.name,
        description: stretch.description,
        video: stretch.video,
        instructions: stretch.instructions
      }
    }
  })
}

export const stretchUpdate = (stretch, id, user) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/stretch/' + id + '/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      stretch: {
        name: stretch.name,
        description: stretch.description,
        video: stretch.video,
        instructions: stretch.instructions
      }
    }
  })
}
