import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data

    case 'CLEAR_ALL_USERS':
        return []

    default: 
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const entries = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: entries,
    })
  }
}

export const removeUsers = () => {
    return {
        type: 'CLEAR_ALL_USERS'
  }
}
 

export default reducer