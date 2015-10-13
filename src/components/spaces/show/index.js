import React, {Component, PropTypes} from 'react'
import SpaceCanvas from 'gComponents/spaces/canvas'
import StandardDropdownMenu from 'gComponents/utility/standard-dropdown-menu'
import { connect } from 'react-redux';
import { denormalizedSpaceSelector } from '../denormalized-space-selector.js';
import style from './style.css'
import * as spaceActions from 'gModules/spaces/actions.js'
import Icon from 'react-fa'
import SpaceHeader from '../canvas/header.js'
import _ from 'lodash'

function mapStateToProps(state) {
  return {
    me: state.me,
  }
}

@connect(mapStateToProps)
@connect(denormalizedSpaceSelector)
export default class CanvasShow extends Component {
  displayName: 'RepoDetailPage'
  onSave() {
    this.props.dispatch(spaceActions.update(parseInt(this.props.spaceId)))
  }
  destroy() {
    this.props.dispatch(spaceActions.destroy(this.props.denormalizedSpace))
  }
  render () {
    const space = this.props.denormalizedSpace;
    return (
    <div>
      <div className='hero-unit'>
        <div className='container-fluid'>
          <div className='ui secondary menu'>

            <div className='item'>
              <h1> {space ? space.name : ''} </h1>
            </div>

              <div className='item action'>
              {space && space.ownedByMe &&
                <StandardDropdownMenu toggleButton={<a><Icon name='cog'/> Settings </a>}>
                    <li key='1' onMouseDown={this.destroy.bind(this)}><button type='button'>Delete</button></li>
                </StandardDropdownMenu>
              }

              {space && !space.busy &&
                <a onClick={this.onSave.bind(this)}>
                  <Icon name='save'/> {'Save'}
                </a>
              }

              {space && !!space.busy &&
                <a onClick={this.onSave.bind(this)}>
                  {'saving...'}
                </a>
              }
              </div>
            <div className='right  menu'>

            {space && space.user &&
              <div>
                <a className='ui image label'>
                  <img  src={space.user.picture}/>
                  {space.user.name}
                </a>
              </div>
            }

            </div>
          </div>
        </div>
      </div>
      { space && <SpaceCanvas spaceId={space.id}/>}
      </div>
    )
  }
}
