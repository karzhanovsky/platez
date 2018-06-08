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
            {this.props.user ?
              <AddComment plate={this.state.plate} /> :
              <div className="log-in-to-comment">
                <p>Zaloguj się aby dodać komentarz</p>
                <Link to="/konto">
                  Zaloguj
                </Link>
              </div>}
            <RenderComments plate={this.state.plate} />
          </div>
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
