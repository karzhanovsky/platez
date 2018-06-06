import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddComment from '../components/add-comment';
import RenderComments from '../components/render-comments';

class SinglePlate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      plate: this.props.match.params.id,
    }
  }

  render() {
      return (
        <div className="single-plate">
          <h1>{this.state.plate.toUpperCase()}</h1>
          <div className="comments">
            <h3>Komentarze:</h3>
            <RenderComments plate={this.state.plate} />
          </div>
          {this.props.user ? <AddComment plate={this.state.plate} /> : <div className="log-in-to-comment">Zaloguj się aby dodać komentarz<Link to="/konto">Zaloguj</Link></div>}
        </div>
      )
    return (
      <div>Loading...</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SinglePlate);
