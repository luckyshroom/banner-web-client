import React, {Component} from "react";
import Banner from "./Banner";
import Category from "./Category";
import Modal from "./Modal";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBanner: true
        };
    }

    handleTab = (e) => {
        switch (e.currentTarget.getAttribute("id")) {
            case "banner":
                this.setState({isBanner: true});
                break;
            case "category":
                this.setState({isBanner: false});
                break;
            default:
                break;
        }
    };

    render() {
        let {isBanner} = this.state;

        return (
            <div className="app-container" style={{height: "100%", padding: "1rem", minWidth: 1312}}>
                <div className="tabs is-left">
                    <ul>
                        <li className={isBanner ? 'is-active' : null}>
                            <a id="banner" onClick={this.handleTab}>
                                <span className="icon"><i className="fas fa-file-alt"/></span>
                                <span>Banner</span>
                            </a>
                        </li>
                        <li className={!isBanner ? 'is-active' : null}>
                            <a id="category" onClick={this.handleTab}>
                                <span className="icon"><i className="fas fa-layer-group"/></span>
                                <span>Category</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {isBanner ? <Banner/> : <Category/>}
                <Modal/>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)(App)
