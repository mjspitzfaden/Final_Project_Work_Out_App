

      import { combineReducers } from 'redux';

      // var initialState = {
      //   contacts: [],
      //   visibilityFilter: 'SHOW_ALL'
      // };

      function contacts (state = [], action) {
        switch (action.type) {
          case 'INIT_CONTACT':
            return action.data;

          case 'ADD_CONTACT':
            // 1. Copy the sate
            // let new_state = Object.assign({}, state, {contacts: []});
            // state.contacts.forEach((old, index) => {
            //   let new_contact = Object.assign({}, old);
            //   new_state.contacts.push(new_contact);
            // });

            var new_state = [...state];

            // 2. Modify new state
            new_state.push(action.data);

            // 3. return new state
            return new_state;

          case 'UPDATE_CONTACT':
            // let new_state = Object.assign({}, state, {contacts: []});
            // state.contacts.forEach((old_contact, index) => {
            //   let new_contact = Object.assign({}, old_contact);
            //   new_state.contacts.push(new_contact);
            // });

            var new_state = [...state];

            new_state[action.index] = action.data;

            console.log(new_state);
            return new_state;

          case 'DELETE_ATTR':
          // 1. Copy the sate
          // let new_state = Object.assign({}, state, {contacts: []});
          // state.contacts.forEach((old, index) => {
          //   let new_contact = Object.assign({}, old);
          //   new_state.contacts.push(new_contact);
          // });

            var new_state = [...state];

          // 2. Modify new state
            new_state.splice(action.index, 1);
            console.log(new_state);

          // 3. return new state
          return new_state;

          case 'CLICKED':
          // 1. Copy the sate
          // let new_state = Object.assign({}, state, {contacts: []});
          // state.contacts.forEach((old, index) => {
          //   let new_contact = Object.assign({}, old);
          //   new_state.contacts.push(new_contact);
          // });

            var new_state = [...state];

          // 2. Modify new state
            new_state[action.index].clicked = !new_state[action.index].clicked
            console.log(new_state);

          // 3. return new state
          return new_state;

          case 'LOGGED_OUT':
          // 1. Copy the sate
          // let new_state = Object.assign({}, state, {contacts: []});
          // state.contacts.forEach((old, index) => {
          //   let new_contact = Object.assign({}, old);
          //   new_state.contacts.push(new_contact);
          // });

            var new_state = [...state];

          // 2. Modify new state
            //new_state.logged_in.clicked = !new_state.logged_in.clicked;
            console.log(new_state);

          // 3. return new state
          return new_state;

          default:
            return state;
        }

      }

      function visibilityFilter(state = 'SHOW_ALL', action) {
        switch (action.type) {
          case 'SET_FILTER':
            return action.filter
          default:
            return state
        }
      }

      function user_reducer(state = {}, action) {
        switch (action.type) {
          case 'LOGGED_IN':
            return action.user;
          case 'REMOVE_USER':
            return {}
          default:
            return state
        }
      }

      function retrieved_contacts(state = false, action) {
        switch (action.type) {
          case 'RETRIEVED':
            return true;
          default:
            return state
        }
      }


      const contactApp = combineReducers({
        visibilityFilter: visibilityFilter,
        contacts: contacts,
        user: user_reducer,
        retrieved_contacts: retrieved_contacts
      })

      export default contactApp;
