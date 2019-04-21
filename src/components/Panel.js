import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: null
        };
    }

    handleInput = (e) => this.setState({searchKey: e.currentTarget.value.toLowerCase()});

    render() {
        let {isCreator, label, list, handle, toggle} = this.props;
        let {searchKey} = this.state;

        list = searchKey == null ? list : list.filter(item => item.name.toLowerCase().includes(searchKey));

        let renderList = list.map((item, i) =>
            <a key={i} id={i} className="panel-block" onClick={handle}>
                <span className="panel-icon">
                    <i className="fas fa-table" aria-hidden="true"/>
                </span>
                {item.name}
            </a>
        );

        return (
            <div className="panel" style={{height: "100%"}}>
                <p className="panel-heading">{label}</p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input className="input is-small" type="text" placeholder="Search" onInput={this.handleInput}/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-search" aria-hidden="true"/>
                        </span>
                    </p>
                </div>
                <div style={{height: "100%", overflowY: "auto"}}>
                    {renderList}
                </div>
                <div className="panel-block">
                    <button className="button is-link is-outlined is-fullwidth" onClick={toggle}>
                        {isCreator ? "Cancel" : "Create"}
                    </button>
                </div>
            </div>
        )
    }
}

Panel.propTypes = {
    isCreator: PropTypes.bool.isRequired,
    handle: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    toggle: PropTypes.func.isRequired
};

export default connect(
    state => ({}),
    dispatch => ({})
)(Panel)
