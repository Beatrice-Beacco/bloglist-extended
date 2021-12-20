const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data

    case 'CANCEL':
        return null

    default: 
      return state
  }
}


export const setMessage = (message) => {
    return {
      type: 'SET',
      data: message
  }
}

export const removeMessage = (data) => {
    return {
        type: 'CANCEL'
  }
}


 

export default reducer