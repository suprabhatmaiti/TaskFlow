export const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  loading: false,
};

export const UPDATE_FIELD = "UPDATE_FIELD";
export const RESET_FORM = "RESET_FORM";
export const SET_ERROR = "SET_ERROR";

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return { ...state, [action.field]: action.value };
    case RESET_FORM:
      return initialState;
    case SET_ERROR:
      return { ...state, error: action.value };
    default:
      return state;
  }
}
