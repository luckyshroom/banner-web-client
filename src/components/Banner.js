import React, {Component, Fragment} from "react";
import Panel from "./Panel";
import Select from "react-select";
import {connect} from "react-redux";
import {debounce} from "lodash";
import {createBanner, getBannerList, updateBanner} from "../actions/bannerAction";
import {getCategoryList} from "../actions/categoryAction";
import {request} from "../utils/APIUtils";
import {setStatus} from "../utils/FormValidatorHelper";
import {ABC_NUM_REGEX, API_BASE_URL} from "../constants";
import {REACT_SELECT_STYLES} from "../constants/defaultStyles";

class Banner extends Component {

    static defaultProps = {
        emptyBanner: {
            name: '',
            price: '',
            categoryId: '',
            content: ''
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isBannerName: true,
            isCreator: false,
            banner: this.props.emptyBanner,
            tempBanner: this.props.emptyBanner
        };
        this.bannerName = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.getBannerList();
        this.props.getCategoryList()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.updateFlag !== prevProps.updateFlag) {
            this.props.getBannerList();
            this.props.getCategoryList()
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    checkBannerName = debounce(() => {
        if (this._isMounted) {
            let banner = this.state.banner;
            let tempBanner = this.state.tempBanner;
            if (ABC_NUM_REGEX.test(tempBanner.name) && banner.name !== tempBanner.name) {
                request({
                    url: API_BASE_URL + "exists/banner?name=" + tempBanner.name,
                    method: "GET"
                }).then(response => {
                    this.setState({isBannerName: !response});
                    if (response) {
                        setStatus(this.bannerName.current).danger()
                    } else {
                        setStatus(this.bannerName.current).success()
                    }
                })
            } else if (banner.name === tempBanner.name) {
                this.setState({isBannerName: true});
                setStatus(this.bannerName.current).success()
            } else {
                this.setState({isBannerName: false});
                setStatus(this.bannerName.current).danger()
            }
        }
    }, 1000);

    handleBanner = (e) => {
        let banner = this.props.bannerList[e.currentTarget.id];
        this.setState({
            isCreator: false,
            isBannerName: true,
            banner: banner,
            tempBanner: banner
        }, () => setStatus(this.bannerName.current).success());
    };

    handleCategoryInput = (category) => {
        this.setState({tempBanner: {...this.state.tempBanner, categoryId: category.value}});
    };

    handleContentInput = (e) => {
        this.setState({tempBanner: {...this.state.tempBanner, content: e.currentTarget.value}});
    };

    handleNameInput = (e) => {
        this.setState({tempBanner: {...this.state.tempBanner, name: e.currentTarget.value}}, () =>
            this.checkBannerName());
    };

    handlePriceInput = (e) => {
        this.setState({tempBanner: {...this.state.tempBanner, price: e.currentTarget.value}});
    };

    toggleCreator = () => {
        this.setState({
            isCreator: !this.state.isCreator,
            banner: this.props.emptyBanner,
            tempBanner: this.props.emptyBanner
        })
    };

    create = () => this.props.createBanner(this.state.tempBanner);

    delete = () => this.props.updateBanner(this.state.banner.id, {...this.state.tempBanner, deleted: true});

    update = () => this.props.updateBanner(this.state.banner.id, this.state.tempBanner);

    render() {
        let {bannerError, bannerList} = this.props;
        let {isBannerName, isCreator, banner, tempBanner} = this.state;

        // noinspection EqualityComparisonWithCoercionJS
        let hasChanges = banner.name !== tempBanner.name ||
            banner.price != tempBanner.price ||
            banner.categoryId !== tempBanner.categoryId ||
            banner.categoryId !== tempBanner.categoryId ||
            banner.content !== tempBanner.content;
        let isReady = isBannerName &&
            Number(tempBanner.price) &&
            tempBanner.categoryId &&
            tempBanner.content &&
            hasChanges;

        let categoryOptions = this.props.categoryList.map(category =>
            Object.create({value: category.id, label: category.name}));

        let renderForm = () => (
            <Fragment>
                <div className="field" ref={this.bannerName}>
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Name" value={tempBanner.name}
                               onChange={this.handleNameInput}/>
                    </div>
                    <p className="help is-hidden">"Invalid banner name"</p>
                </div>
                <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Price" value={tempBanner.price}
                               onChange={this.handlePriceInput}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Category</label>
                    <Select className="basic-single"
                            closeMenuOnSelect={false}
                            isClearable={false}
                            maxMenuHeight={180}
                            options={categoryOptions}
                            styles={REACT_SELECT_STYLES}
                            value={categoryOptions.filter(category =>
                                category.value === tempBanner.categoryId)}
                            onChange={this.handleCategoryInput}/>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <textarea className="textarea" placeholder="Content..." value={tempBanner.content}
                                  onChange={this.handleContentInput} style={{maxHeight: 400}}/>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "auto", padding: "8px 0"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        {bannerError !== null ? <p className="has-text-danger">{bannerError.message}</p> : null}
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
                        <Panel isCreator={isCreator} label="Banners" list={bannerList}
                               handle={this.handleBanner} toggle={this.toggleCreator}/>
                    </div>
                    <div className="column">
                        {isCreator || banner.name ? renderForm() : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        updateFlag: state.banner.updateFlag,
        categoryList: state.category.list,
        bannerError: state.banner.error,
        bannerList: state.banner.list
    }),
    dispatch => ({
        createBanner: (body) => dispatch(createBanner(body)),
        getBannerList: () => dispatch(getBannerList()),
        getCategoryList: () => dispatch(getCategoryList()),
        updateBanner: (bannerId, body) => dispatch(updateBanner(bannerId, body))
    })
)(Banner)
