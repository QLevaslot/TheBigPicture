import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as cst from '../../../constants'
import BigPictureList, { createList } from '../../../components/BigPicture/list'
import AddBigPictureButton from '../../../components/BigPicture/looks/addbutton'
import "./style.scss"


const subjectsList = () => {
  const bigPicture = null
  const bpFilter = (bp) => {
    return (
      bp.kind == cst.SUBJECT
    )
  }
  const buttons = ["edit", "look"]
  const showRatings = false
  const ownRating = true
  return createList(bigPicture, bpFilter, buttons, showRatings, ownRating)

}

const HomeLook = ({ getBigPictures, user }) => {

  useEffect(() => {
    getBigPictures()
  })

  const initNewBp = {
    kind: cst.SUBJECT,
    title: "",
    parent: null
  }

  const canCreate = user.username != cst.GUEST_NAME

  return (
    <div>
      <div className="hero resource">
        <div className="container tbp-section">
          <div className="level is-mobile">
            <h1 className="title">SUJETS</h1>
            { canCreate ? <AddBigPictureButton initBp={initNewBp} /> : null }
          </div>
        </div>
      </div>
      <div className="container tbp-section">
        { subjectsList() }
      </div>
    </div>
  )
}

HomeLook.propTypes = {
  getBigPictures: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default HomeLook
