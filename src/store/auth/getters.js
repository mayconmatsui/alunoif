export const getUser = state => {
  return state.user
}

export const getLoginState = state => {
  return state.isLoggedIn
}

export const getError = state => {
  return state.error
}
