import React from 'react'

const initialState = {
    products: [],
}

function products(state = initialState, { type, payload }) {
    switch (type) {
        case "LOAD_PRODUCTS":
            return {
                ...state,
                products: payload
            }
        case "ADD_PRODUCTS":
            return {
                ...state,
                products: [...state.products, payload]
            }
        case "EDIT_PRODUCTS":
            console.log(payload);
            return {
                ...state,
                products: state.products.map((s) => {
                    if (s._id == payload._id) {
                        return {
                            ...s,
                            name: payload.name,
                            description: payload.description,
                            categoryId: payload.categoryId,
                            cost: payload.cost,
                            count: payload.count
                        }
                    } else {
                        return s;
                    }
                })
            }
        case "DELETE_PRODUCTS":
            return {
                ...state,
                products: state.products.filter(s => s._id !== payload)
            }
        default:
            return state;
    }
}

export default products