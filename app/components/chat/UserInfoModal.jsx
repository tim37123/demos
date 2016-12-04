import React, {Component} from 'react';

export default class Participants extends Component {
  constructor(props){
    super(props);
  }

  setInfo(){
    let userName = this.refs.inputUsername
    let phone = this.refs.inputPhone
    this.props.userUpdate({userName: userName.value, phone: phone.value})
    userName.value = '';
    phone.value = '';
  }

  render() {
    return(
          <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                  <h4 className="modal-title" id="myModalLabel">Update Your Info</h4>
                </div>
                <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="Username">Username</label>
                        <input type="text" className="form-control" ref="inputUsername" placeholder="Enter New User Name"/>
                        <small id="emailHelp" className="form-text text-muted">This will replace your email in that participants list</small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="Phone">Phone</label>
                        <input type="text" className="form-control" ref="inputPhone" placeholder="1231231234"/>
                        <small id="emailHelp" className="form-text text-muted">10 digit US Phone numbers only please!</small>
                      </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.setInfo.bind(this)}>Save</button>
                </div>
              </div>
            </div>
          </div>
    );
  }
}