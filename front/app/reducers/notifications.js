import * as cst from "../constants"

const DEFAULT_NOTIFICATION = {
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: { duration: 2000 },
  dismissable: { click: true }
}

const notifications = (state = [], action) => {
  switch (action.type) {

    case cst.ADD_NOTIFICATION:
      return [
        ...state,
        {
          ...DEFAULT_NOTIFICATION,
          ...action.notif,
        }
      ]

    case cst.POP_NOTIFICATION:
      return state.filter(notif => notif.id != action.id)

    default:
      return state
  }
}

export default notifications