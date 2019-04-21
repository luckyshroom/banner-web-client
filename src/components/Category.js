import React, {Component, Fragment} from "react";
import Panel from "./Panel";
import {connect} from "react-redux";
import {createCategory, getCategoryList, updateCategory} from "../actions/categoryAction";
import {debounce} from "lodash";
import {ABC_NUM_REGEX, API_BASE_URL} from "../constants";
import {request} from "../utils/APIUtils";
import {setStatus} from "../utils/FormValidatorHelper";

class Category extends Component {

    static defaultProps = {
        emptyCategory: {
            name: '',
            reqName: ''
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            hasRefs: false,
            isCategoryName: true,
            isCategoryReqName: true,
            isCreator: false,
            category: this.props.emptyCategory,
            tempCategory: this.props.emptyCategory
        };
        this.categoryName = React.createRef();
        this.categoryReqName = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.getCategoryList()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.updateFlag !== prevProps.updateFlag) {
            this.props.getCategoryList()
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    checkCategoryName = debounce(() => {
        if (this._isMounted) {
            let category = this.state.category;
            let tempCategory = this.state.tempCategory;
            if (ABC_NUM_REGEX.test(tempCategory.name) && category.name !== tempCategory.name) {
                request({
                    url: API_BASE_URL + "exists/category?name=" + tempCategory.name,
                    method: "GET"
                }).then(response => {
                    this.setState({isCategoryName: !response});
                    if (response) {
                        setStatus(this.categoryName.current).danger()
                    } else {
                        setStatus(this.categoryName.current).success()
                    }
                })
            } else if (category.name === tempCategory.name) {
                this.setState({isCategoryName: true});
                setStatus(this.categoryName.current).success()
            } else {
                this.setState({isCategoryName: false});
                setStatus(this.categoryName.current).danger()
            }
        }
    }, 1000);

    checkCategoryReqName = debounce(() => {
        if (this._isMounted) {
            let category = this.state.category;
            let tempCategory = this.state.tempCategory;
            if (ABC_NUM_REGEX.test(tempCategory.reqName) && category.reqName !== tempCategory.reqName) {
                request({
                    url: API_BASE_URL + "exists/category?reqName=" + tempCategory.reqName,
                    method: "GET"
                }).then(response => {
                    this.setState({isCategoryReqName: !response});
                    if (response) {
                        setStatus(this.categoryReqName.current).danger()
                    } else {
                        setStatus(this.categoryReqName.current).success()
                    }
                })
            } else if (category.reqName === tempCategory.reqName) {
                this.setState({isCategoryReqName: true});
                setStatus(this.categoryReqName.current).success()
            } else {
                this.setState({isCategoryReqName: false});
                setStatus(this.categoryReqName.current).danger()
            }
        }
    }, 1000);

    handleCategory = (e) => {
        let category = this.props.categoryList[e.currentTarget.id];
        this.setState({
            isCreator: false,
            hasRefs: category.bannerList.filter(banner => !banner.deleted).length > 0,
            category: category,
            tempCategory: category
        })
    };

    handleNameInput = (e) => {
        this.setState({tempCategory: {...this.state.tempCategory, name: e.currentTarget.value}}, () =>
            this.checkCategoryName());
    };

    handleReqNameInput = (e) => {
        this.setState({tempCategory: {...this.state.tempCategory, reqName: e.currentTarget.value}}, () =>
            this.checkCategoryReqName());
    };

    toggleCreator = () => {
        this.setState({
            isCreator: !this.state.isCreator,
            category: this.props.emptyCategory,
            tempCategory: this.props.emptyCategory
        })
    };

    create = () => this.props.createCategory(this.state.tempCategory);

    delete = () => {
        let category = this.state.category;
        if (this.state.hasRefs) {
            let refs = category.bannerList
                .filter(banner => !banner.deleted)
                .map((banner, i) => ++i + ". " + banner.name);
            refs.unshift("This category has references:");
            this.props.showModal(refs)
        } else {
            this.props.updateCategory(category.id, {...category, deleted: true})
        }
    };

    update = () => this.props.updateCategory(this.state.category.id, this.state.tempCategory);

    render() {
        let {categoryError, categoryList} = this.props;
        let {isCategoryName, isCategoryReqName, isCreator, category, tempCategory} = this.state;

        let hasChanges = category.name !== tempCategory.name ||
            category.reqName !== tempCategory.reqName;
        let isReady = isCategoryName &&
            isCategoryReqName &&
            hasChanges;

        let renderForm = () => (
            <Fragment>
                <div className="field" ref={this.categoryName}>
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Name" value={tempCategory.name}
                               onChange={this.handleNameInput}/>
                    </div>
                    <p className="help is-hidden">"Invalid category name"</p>
                </div>
                <div className="field" ref={this.categoryReqName}>
                    <label className="label">ReqName</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="ReqName" value={tempCategory.reqName}
                               onChange={this.handleReqNameInput}/>
                    </div>
                    <p className="help is-hidden">"Invalid category reqName"</p>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "auto", padding: "8px 0"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        {categoryError !== null ? <p className="has-text-danger">{categoryError.message}</p> : null}
                    </div>
                    <div>
                        {!isCreator ? <button className="button is-danger"
                                              onClick={this.delete} style={{marginRight: 8}}>Delete</button> : null}
                        <button className="button is-success" disabled={!isReady}
                                onClick={isCreator ? this.create : this.update}>Save</button>
                    </div>
                </div>
            </Fragment>
        );

        return (
            <div style={{display: "flex", flex: "1 1 auto", maxHeight: "calc(100% - 57px)"}}>
                <div className="columns" style={{maxHeight: 1024}}>
                    <div className="column is-3" style={{paddingRight: "1rem"}}>
                        <Panel isCreator={isCreator} label="Categories" list={categoryList}
                               handle={this.handleCategory} toggle={this.toggleCreator}/>
                    </div>
                    <div className="column">
                        {isCreator || category.name ? renderForm() : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        updateFlag: state.category.updateFlag,
        categoryError: state.category.error,
        categoryList: state.category.list
    }),
    dispatch => ({
        createCategory: (body) => dispatch(createCategory(body)),
        getCategoryList: () => dispatch(getCategoryList()),
        showModal: (messageList) => dispatch({type: "SHOW_MODAL", messageList: messageList}),
        updateCategory: (categoryId, body) => dispatch(updateCategory(categoryId, body))
    })
)(Category)
