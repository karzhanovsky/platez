import React, { Component } from 'react';
import { fetchProfile } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

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
          <li key={comment.content}><span>{comment.author}</span><p>{comment.content}</p><span>Likes</span></li>
        );
      })
    } else {
      return <p>No comments yet. Be the first to comment!</p>
    }
  }

  render() {
    if (!_.isEmpty(this.props.profile)) {
      return (
        <div className="single-plate">
          <div className="avatar"></div>
          <h1>{this.state.plate.toUpperCase()}</h1>
          <h2>Marka pojazdu: Audi TT</h2>
          <div className="comments">
            <h3>Komentarze:</h3>
            <ul>
              {this.renderComments()}
            </ul>
          </div>
          {this.props.user ? <AddComment plate={this.state.plate} /> : <p>Zaloguj się aby dodać komentarz</p>}
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
    profile: state.profile,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProfile: fetchProfile}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlate);
