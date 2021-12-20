import { createStore, combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from '../reducers/blogsReducer.js'
import userReducer from '../reducers/userReducer.js'
import errorReducer from '../reducers/errorReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogs: blogsReducer,
  user: userReducer,
  error: errorReducer
})

export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
  )
)