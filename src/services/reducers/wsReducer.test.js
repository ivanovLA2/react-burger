import {wsReducer} from './wsReducer'
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/ws-action-types";
import {ORDER_INFO_FAILED, ORDER_INFO_REQUEST, ORDER_INFO_SUCCESS} from "../actions/order-action-types";

describe('WS reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(
            {
                wsConnected: false,
                feed: null,
                order: null,
                orderFailed: false,
                orderRequest: false
            }
        )
    })

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_SUCCESS,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: true
            }
        )
    })

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_ERROR,
                payload: {name: 'error'}
            })
        ).toEqual(
            {
                error: {name: 'error'},
                wsConnected: false
            }
        )
    })

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_CLOSED,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false
            }
        )
    })

    it('should handle WS_GET_MESSAGE', () => {
        expect(
            wsReducer({}, {
                type: WS_GET_MESSAGE,
                payload: {message: 'message'},
            })
        ).toEqual(
            {
                error: undefined,
                feed: {message: 'message'}
            }
        )
    })

    it('should handle ORDER_INFO_REQUEST', () => {
        expect(
            wsReducer({}, {
                type: ORDER_INFO_REQUEST,
            })
        ).toEqual(
            {
                orderRequest: true,
                orderFailed: false
            }
        )
    })

    it('should handle ORDER_INFO_FAILED', () => {
        expect(
            wsReducer({}, {
                type: ORDER_INFO_FAILED,
            })
        ).toEqual(
            {
                orderRequest: false,
                orderFailed: true
            }
        )
    })

    it('should handle ORDER_INFO_SUCCESS with order', () => {
        expect(
            wsReducer({}, {
                type: ORDER_INFO_SUCCESS,
                order: {_id: 'id'},
            })
        ).toEqual(
            {
                orderRequest: false,
                orderFailed: false,
                order: {_id: 'id'},
            }
        )
    })

    it('should handle ORDER_INFO_SUCCESS without order', () => {
        expect(
            wsReducer({}, {
                type: ORDER_INFO_SUCCESS,
                order: null,
            })
        ).toEqual(
            {
                orderRequest: false,
                orderFailed: true
            }
        )
    })
})