import { ADD_CAR, UPDATE_CAR, FETCH_CARS, REMOVE_CAR } from '../types'

const handlers = {
    [ADD_CAR] : (state, {payload}) => ({
        ...state,
        cars: [...state.cars, payload]
    }),
    [FETCH_CARS]: (state, {payload}) => ({
        ...state,
        cars: payload
    }),
    [REMOVE_CAR]: (state, {payload}) => ({
        ...state,
        cars: state.cars.filter(car => car.id !== payload.id)
    }),
    [UPDATE_CAR]: (state, {payload}) => ({
        ...state,
        cars: [...state.cars.filter(car => car.id !== payload.id), payload]
    }),
    DEFAULT : state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}