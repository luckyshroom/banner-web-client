import React, {Component} from "react";
import {connect} from "react-redux";

class Modal extends Component {

    render() {
        let renderMessageList = () => this.props.messageList.map((message, i) => <p key={i}>{message}</p>);

        return (
            <div className={this.props.active ? "modal is-active" : "modal"}>
                <div className="modal-background"/>
                <div className="modal-content" style={{width: 320}}>
                    <div className="box">
                        {renderMessageList()}
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={this.props.closeModal}/>
            </div>
        )
    }
}

export default connect(
    state => ({
        active: state.modal.active,
        messageList: state.modal.messageList
    }),
    dispatch => ({
        closeModal: () => dispatch({type: "CLOSE_MODAL"})
    })
)(Modal)
