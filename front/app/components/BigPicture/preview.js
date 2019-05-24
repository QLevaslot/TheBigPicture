import { connect } from 'react-redux'
import BigPicturePreviewLook from './looks/preview'


const mapStateToProps = (state, ownProps) => {
  return {
    data: state.get("bigpictures").find(bp => bp.id == ownProps.bpId)
  }
}

const BigPicturePreview = connect(mapStateToProps)(BigPicturePreviewLook)

export default BigPicturePreview