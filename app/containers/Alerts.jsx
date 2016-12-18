import React, {Component} from 'react';
import {connect} from 'react-redux';

class Alert extends Component {
	constructor(props){
		super(props);
	}

  dismissAlert(index, proxy, event){
    this.props.dispatch({type: 'DELETE_ALERT', index: index});
  }

  render() {
    let msgs = '';
    if(this.props.alerts){
        msgs = this.props.alerts.map(function(msgDeets, index){
          const alertType = "alert alert-" + msgDeets.type;
          return <div className={alertType} role="alert" key={index}>
                    <button type="button" className="close" onClick={this.dismissAlert.bind(this, index)}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <strong>Oh snap!</strong> {msgDeets.msg}
                  </div>
        }.bind(this));
    }

    return(
      <div className="container">
        {msgs}
      </div>
    );
  }
}

function mapStateToProps(state){
  const alerts = state.get('alerts').toJS()
  return alerts
}

export default connect(mapStateToProps)(Alert);