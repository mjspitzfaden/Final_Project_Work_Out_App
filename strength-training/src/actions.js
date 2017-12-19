
export function initContact (data) {
  return {
    type: 'INIT_CONTACT',
    data: data
  }
}

export function addContact (data) {
  return {
    type: 'ADD_CONTACT',
    data: data
  }
}

export function updateContact (index, data) {
  return {
    type: 'UPDATE_CONTACT',
    index: index,
    data: data
  }
}

export function clicked (index) {
  return {
    type: 'CLICKED',
    index: index
  }
}

export function deleteAttr (index) {
  return {
    type: 'DELETE_ATTR',
    index: index
  }
}

export function loggedIn (user) {
  return {
    type: 'LOGGED_IN',
    user: user
  }
}

export function loggedOut () {
  return {
    type: 'LOGGED_OUT'
  }
}

export function removeUser () {
  return {
    type: 'REMOVE_USER'
  }
}

export function retrieved () {
  return {
    type: 'RETRIEVED'
  }
}
