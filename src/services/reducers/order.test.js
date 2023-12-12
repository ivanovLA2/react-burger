import {initialOrderState, orderReducer} from './order'
import {
  ADD_INGREDIENT,
  CHANGE_POSITION,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_INGREDIENT
} from "../actions/order";

describe('Order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(
        initialOrderState
    )
  })

  it('should handle CREATE_ORDER_REQUEST', () => {
    expect(
        orderReducer({}, {
          type: CREATE_ORDER_REQUEST,
        })
    ).toEqual(
        {
          orderRequest: true,
          orderNumber: null
        }
    )
  })

  it('should handle CREATE_ORDER_FAILED', () => {
    expect(
        orderReducer({}, {
          type: CREATE_ORDER_FAILED,
        })
    ).toEqual(
        {
          orderFailed: true, orderRequest: false
        }
    )
  })

  it('should handle CREATE_ORDER_SUCCESS', () => {
    expect(
        orderReducer({}, {
          type: CREATE_ORDER_SUCCESS,
          orderNumber: 1,
        })
    ).toEqual(
        {
          orderFailed: false,
          orderNumber: 1,
          orderRequest: false,
          orderItems: [],
          bun: null
        }
    )
  })

  it('should handle ADD_INGREDIENT bun', () => {
    expect(
        orderReducer({}, {
          type: ADD_INGREDIENT,
          item: {_id: 'id', type: 'bun'},
        })
    ).toEqual(
        {
          bun: {_id: 'id', type: 'bun'}
        }
    )
  })

  it('should handle ADD_INGREDIENT main', () => {
    expect(
        orderReducer({orderItems: []}, {
          type: ADD_INGREDIENT,
          item: {_id: 'id', type: 'main'},
        })
    ).toEqual(
        {
          orderItems: [{_id: 'id', type: 'main'}]
        }
    )
  })

  it('should handle REMOVE_INGREDIENT', () => {
    expect(
        orderReducer({ orderItems: [{_id: 'id', type: 'main'}]}, {
          type: REMOVE_INGREDIENT,
          id: 'id',
        })
    ).toEqual(
        {
          orderItems: []
        }
    )
  })

  it('should handle CHANGE_POSITION', () => {
    expect(
        orderReducer({orderItems: [{_id: 'id', type: 'main'}, {_id: 'id2', type: 'main2'}]}, {
          type: CHANGE_POSITION,
          dragIndex: 0,
          hoverIndex: 1,
        })
    ).toEqual(
        {
          orderItems:  [{_id: 'id2', type: 'main2'}, {_id: 'id', type: 'main'}]
        }
    )
  })
})