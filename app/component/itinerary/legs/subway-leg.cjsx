React = require 'react'
timeUtils    = require '../../../util/time-utils'
TransitLeg   = require './TransitLeg'
intl = require 'react-intl'
FormattedMessage = intl.FormattedMessage

class SubwayLeg extends React.Component

  render: ->

    <TransitLeg
      mode={"SUBWAY"}
      leg={@props.leg}
      focusAction={@props.focusAction}
      index={@props.index}
      >
      <FormattedMessage
        id={"subway-with-route-number"}
        values={{
          routeNumber: @props.leg.route?.shortName
          headSign: @props.leg.trip?.tripHeadsign
          }}
        defaultMessage={"Subway {routeNumber} {headSign}"}/>
    </TransitLeg>


module.exports = SubwayLeg
