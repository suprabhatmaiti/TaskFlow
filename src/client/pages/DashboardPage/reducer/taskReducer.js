export const initialState = {
  title: "",
  description: "",
  priority: "",
  status: "",
  dueDate: "",
  loading: false,
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return initialState;
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
