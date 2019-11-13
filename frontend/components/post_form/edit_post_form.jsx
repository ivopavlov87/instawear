import React from 'react';
import { connect } from 'react-redux';

class EditPostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.post;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let button = e.target;
        let parent = button.parentElement;
        let loading = document.createElement('p');
        loading.innerText = 'Updating...';
        loading.classList.add('loader-btn');
        parent.removeChild(button);
        parent.appendChild(loading); 
        this.props.action(this.state)
            .then(() => {
                this.props.closeForm(false);
            });
    }

    render() {
        return (
            <div className="upload-frame">
                <div className="upload-form">

                    <div className="post-header">
                        <p className="post-title">{this.props.formTitle}</p>
                        <a className="close" onClick={() => this.props.closeForm(false)}></a>
                    </div>

                    <div className="post-content">
                        <div className="post-form-details">
                            <label>
                                Location: 
                                <div className="form-location">
                                    <input type="text"
                                        value={this.state.location}
                                        placeholder="Edit the location..."
                                        onChange={this.update("location")}
                                    />
                                </div>
                            </label>
                            <label>
                                Caption:
                                <div className="form-caption edit-post-caption">
                                    <textarea type="text"
                                        value={this.state.caption}
                                        placeholder="Edit the caption..."
                                        onChange={this.update("caption")}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="post-btns">
                        <button onClick={() => this.props.closeForm(false)} className="post-cancel-btn">Cancel</button>
                        <button className="post-submit-btn" onClick={this.handleSubmit}>{this.props.btnText}</button>
                    </div>
                </div>

                <div className="screen"
                    onClick={() => this.props.closeForm(false)}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formTitle: "Edit Post",
    btnText: "Update"
});

export default connect(mapStateToProps)(EditPostForm);
