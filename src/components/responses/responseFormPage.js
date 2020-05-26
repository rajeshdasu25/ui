import React from 'react'
import { connect } from 'react-redux';
import { fetchLoginUser } from '../../actions/auth';
import { fetchAllCertificates } from '../../actions/certificates';
import { addNewResponse } from '../../actions/responses';
import { fetchAllSkills } from '../../actions/skills';
import ResponseForm from './responseForm';

class ResponseFormPage extends React.Component {
    submit = formValues => { console.log('formValues: ', formValues)
        //this.props.addNewResponse(formValues);
    }

    componentDidMount() {
        const loginUserId = localStorage.hasOwnProperty('loginUserId') && JSON.parse(localStorage.getItem('loginUserId'));
        this.props.fetchLoginUser(loginUserId);
        this.props.fetchAllCertificates();
        this.props.fetchAllSkills(loginUserId);
    }

    render() {
        return <ResponseForm onSubmit={this.submit} {...this.props} />
    }
}

const mapStateToProps = state => {
    return {
        certificates: state.certificates,
        loginUser: state.loginUser,
        loginUserId: state.loginUserId,
        skills: state.skills
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewResponse: (params) => dispatch(addNewResponse(params)),
        fetchLoginUser: (params) => dispatch(fetchLoginUser(params)),
        fetchAllCertificates: () => dispatch(fetchAllCertificates()),
        fetchAllSkills: (params) => dispatch(fetchAllSkills(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponseFormPage);