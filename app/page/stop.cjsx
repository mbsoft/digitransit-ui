React              = require 'react'
Relay              = require 'react-relay'
queries            = require '../queries'
DefaultNavigation  = require '../component/navigation/default-navigation'
Map                = require '../component/map/map'
DepartureListContainer = require '../component/stop-cards/departure-list-container'
StopCardHeader     = require '../component/stop-cards/stop-card-header'
FavouriteStopsAction = require '../action/favourite-stops-action'
Link               = require('react-router/lib/Link').Link
Icon               = require '../component/icon/icon'
moment             = require 'moment'

class Page extends React.Component
  @contextTypes:
    getStore: React.PropTypes.func.isRequired
    executeAction: React.PropTypes.func.isRequired
    router: React.PropTypes.object.isRequired

  componentDidMount: ->
    @context.getStore('FavouriteStopsStore').addChangeListener @onChange

  componentWillUnmount: ->
    @context.getStore('FavouriteStopsStore').removeChangeListener @onChange

  onChange: (id) =>
    if !id or id == @props.params.stopId
      @forceUpdate()

  toggleFullscreenMap: =>
    @context.router.transitionTo "#{process.env.ROOT_PATH}pysakit/#{@props.params.stopId}/kartta"

  render: ->
    favourite = @context.getStore('FavouriteStopsStore').isFavourite(@props.params.stopId)
    addFavouriteStop = (e) =>
      e.stopPropagation()
      @context.executeAction FavouriteStopsAction.addFavouriteStop, @props.params.stopId

    <DefaultNavigation className="fullscreen">
      <Map lat={@props.stop.lat+0.0005} lon={@props.stop.lon} zoom={16} showStops=true hilightedStops=[@props.params.stopId]>
        <div className="map-click-prevent-overlay" onClick={@toggleFullscreenMap}/>
        <StopCardHeader stop={@props.stop} favourite={favourite} addFavouriteStop={addFavouriteStop} className="stop-page" infoIcon={true}/>
        <Link to="#{process.env.ROOT_PATH}pysakit/#{@props.params.stopId}/kartta">
          <div className="fullscreen-toggle">
            <Icon img={'icon-icon_maximize'} className="cursor-pointer" />
          </div>
        </Link>
      </Map>
      <DepartureListContainer showMissingRoutes={false} stop={@props.stop} className="stop-page below-map" routeLinks={true} infiniteScroll={true}/>
    </DefaultNavigation>

module.exports = Relay.createContainer(Page, fragments: queries.StopPageFragments)
