export function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_GOODS':
      return {
        ...state,
        goods: payload || [],
        loading: false
      }
    case 'ADD_TO_BASKET': {
      const itemIndex = state.order.findIndex(orderItem => orderItem.id === payload.id)

      let newOrder = null
      if (itemIndex < 0) {
        const newItem = {
          ...payload,
          quantity: 1
        }

        newOrder = [...state.order, newItem]
      } else {
        newOrder = state.order.map((orderItem, index) => {
          if (index === itemIndex) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1
            }
          } else {
            return orderItem
          }
        })
      }

      return {
        ...state,
        order: newOrder,
        alertName: payload.name
      }
    }
    case 'INCREMENT_QUANTITY': {
      const newOrder = state.order.map(el => {
        if (el.id === payload.id) {
          return {
            ...el,
            quantity: el.quantity + 1
          }
        }

        return el
      })

      return {
        ...state,
        order: newOrder
      }
    }
    case 'DECREMENT_QUANTITY': {
      const newOrder = state.order.map(el => {
        if (el.id === payload.id) {
          return {
            ...el,
            quantity: el.quantity > 0 ? el.quantity - 1 : 0
          }
        }

        return el
      })

      return {
        ...state,
        order: newOrder
      }
    }
    case 'REMOVE_FROM_BASKET':
      return {
        ...state,
        order: state.order.filter(el => el.id !== payload.id)
      }
    case 'CLOSE_ALERT':
      return {
        ...state,
        alertName: ''
      }
    case 'TOGGLE_BASKET':
      return {
        ...state,
        isBasketShow: !state.isBasketShow
      }
    default:
      return state
  }
}