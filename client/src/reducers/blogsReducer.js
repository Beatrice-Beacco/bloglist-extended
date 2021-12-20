import blogsService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const liked = state.map((element) => {
        if (element.id == action.data.updated.id){
          return ({...element, likes: element.likes +1})
        } else {
          return element
        }
      })

      const sorted = liked.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)

      return sorted

    case 'NEW':
      return state.concat(action.data)

    case 'REMOVE':
        const filteredState = state.filter(blog => blog.id !== action.data)
        return filteredState
    
    case 'INIT':
        const blogs = action.data
        const sortedBlogs = blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes)
      return sortedBlogs
    
    case 'CLEAR':
        return []

    default: 
      return state
  }
}


export const voteEntry = (entry, id) => {
  const updatedEntry = {...entry, likes: entry.likes +1}
    return async dispatch => {
    const updated = await blogsService.update(updatedEntry, id)
    dispatch({
      type: 'LIKE',
      data: {
        updated
      }
    })
  }
}

export const addNew = (data) => {
    return async dispatch => {
        const newEntry = await blogsService.create(data);
        dispatch({
        type: 'NEW',
        data: newEntry
    })
  }
}

export const deleteEntry = (id) => {
    return async dispatch => {
        await blogsService.deleteBlog(id);
        dispatch({
        type: 'REMOVE',
        data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const entries = await blogsService.getAll()
    dispatch({
      type: 'INIT',
      data: entries,
    })
  }
 }

 export const clearBlogs = () => {
     return {
         type: 'CLEAR'
     }
 }

export default reducer