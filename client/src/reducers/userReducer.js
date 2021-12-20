const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGGED':
      return action.data

    case 'LOGOUT':
        return null

    default: 
      return state
  }
}

export const setUser = (user) => {
    return {
      type: 'LOGGED',
      data: user
  }
}

export const removeUser = () => {
    return {
        type: 'LOGOUT'
  }
}


 

export default reducer