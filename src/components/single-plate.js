import React, { Component } from 'react';
import { fetchProfile } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class SinglePlate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plate: this.props.match.params.id,
    }
  }

  componentDidMount() {
    this.props.fetchProfile(this.state.plate);
  }

  renderComments() {
    if (typeof this.props.profile === 'object') {
      return _.map(this.props.profile.comments, comment => {
        return (
          <li key={comment}>{comment}</li>
        );
      })
    }
  }

  render() {
    if (!_.isEmpty(this.props.profile)) {
      return (
        <div>
        <Link to='/'>Home</Link>
          <h1>{this.state.plate.toUpperCase()}</h1>
          <div>
            <h3>Comments</h3>
            <ul>
              {this.renderComments()}
            </ul>
          </div>
        </div>
      )
    }
    return (
      <div>Loading...</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProfile: fetchProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlate);
