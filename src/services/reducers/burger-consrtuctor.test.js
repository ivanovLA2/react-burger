import {burgerConstructorReducer} from './burger-consrtuctor'
import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, SET_SELECTED_ITEM} from "../actions/burger-consrtuctor";

describe('Burger constructor reducer', () => {
    it('should return the initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(
            {
                items: [],
                itemsRequest: false,
                itemsFailed: false,
                selectedItem: null
            }
        )
    })

    it('should handle GET_ITEMS_REQUEST', () => {
        expect(
            burgerConstructorReducer({}, {
                type: GET_ITEMS_REQUEST,
            })
        ).toEqual(
            {
                itemsRequest: true,
            }
        )
    })

    it('should handle GET_ITEMS_FAILED', () => {
        expect(
            burgerConstructorReducer({}, {
                type: GET_ITEMS_FAILED,
            })
        ).toEqual(
            {
                itemsFailed: true, itemsRequest: false
            }
        )
    })

    it('should handle GET_ITEMS_SUCCESS', () => {
        expect(
            burgerConstructorReducer({}, {
                type: GET_ITEMS_SUCCESS,
                items: [{_id: 'id'}],
            })
        ).toEqual(
            {
                itemsFailed: false,
                itemsRequest: false,
                items: [{_id: 'id'}],
            }
        )
    })

    it('should handle SET_SELECTED_ITEM', () => {
        expect(
            burgerConstructorReducer({}, {
                type: SET_SELECTED_ITEM,
                item: {_id: 'id'},
            })
        ).toEqual(
            {
                selectedItem: {_id: 'id'}
            }
        )
    })
})