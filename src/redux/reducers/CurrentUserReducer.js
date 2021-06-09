export const CURRENT_USER = 'CURRENT_USER'
export const RESET_USER = 'RESET_USER'
export const FAVOURITE_IMAGE_POST = 'FAVOURITE_IMAGE_POST'
export const REMOVE_FAVOURITE_IMAGE_POST = 'REMOVE_FAVOURITE_IMAGE_POST'
export const FAVOURITE_TEXT_POST = 'FAVOURITE_TEXT_POST'
export const REMOVE_FAVOURITE_TEXT_POST = 'REMOVE_FAVOURITE_TEXT_POST'


const initialState = {
    currentUser: {},
    favouriteImagePost: [],
    favouriteTextPost: [],
}

const CurrentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case FAVOURITE_IMAGE_POST:
            return {
                ...state,
                favouriteImagePost: [...state.favouriteImagePost, ...action.payload],
            }
        case REMOVE_FAVOURITE_IMAGE_POST:
            return {
                ...state,
                favouriteImagePost: removeImagePost(action.payload, state.favouriteImagePost),
            }
        case FAVOURITE_TEXT_POST:
            return {
                ...state,
                favouriteTextPost: [...state.favouriteTextPost, ...action.payload],
            }
        case REMOVE_FAVOURITE_TEXT_POST:
            return {
                ...state,
                favouriteTextPost: removeTextPost(action.payload, state.favouriteTextPost),
            }
        case RESET_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        default:
            return state
    }
}

const removeImagePost = (toRemove, array) => {
    return array.filter((item) => item !== toRemove);
}

const removeTextPost = (toRemove, array) => {
    return array.filter((item) => item._id !== toRemove._id);
}

export default CurrentUserReducer