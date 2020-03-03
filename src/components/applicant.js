import React from 'react'
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import moment from 'moment'

function Applicant(props) {
  const fullName = `${props.applicant.first_name} ${props.applicant.last_name}`;
  const creditIndicatorColor = (val) => {
    if (val > 7) {
      return 'text-success'
    } else if (val < 5) {
      return 'text-danger'
    }
    return
  }

  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{fullName}</Card.Title>
        <p>Applied {moment(props.applicant.created_at).format('LLLL')}</p>
        <p>Credit indicator:
          <span className={creditIndicatorColor(props.applicant.credit_indicator)}> {props.applicant.credit_indicator}</span>
        </p>
      </Card.Body>
    </Card>
  )
}

Applicant.propTypes = {
  applicant: PropTypes.object
}

export default Applicant;