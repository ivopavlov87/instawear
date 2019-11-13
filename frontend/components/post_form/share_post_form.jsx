import React from 'react';
import { connect } from 'react-redux';

class SharePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { caption: '', location: '', photo: this.props.post.photo };
        this.closeForm = this.closeForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    closeForm() {
        this.props.changeSelected(null);
        this.setState({
            caption: '',
            location: '',
            photo: this.props.post.photo
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let button = e.target;
        let parent = button.parentElement;
        let loading = document.createElement('p');
        loading.innerText = 'Sharing...';
        loading.classList.add('loader-btn');
        parent.removeChild(button);
        parent.appendChild(loading); 
        const formData = new FormData();
        formData.append('post[caption]', this.state.caption);
        formData.append('post[location]', this.state.location);
        formData.append('post[photo]', this.state.photo);

        this.props.action(formData)
            .then(() => {
                this.setState({
                    caption: '',
                    location: '',
                    photo: this.props.post.photo
                });
            });
    }

    render() {
        return (
            <div className="upload-frame">
                <div className="upload-form">

                    <div className="post-header">
                        <p className="post-title">{this.props.formTitle}</p>
                        <a className="close" onClick={this.closeForm}></a>
                    </div>

                    <div className="post-content">
                        <div className="preview-img">
                            <img className="preview" src={this.props.post.photoUrl} />
                        </div>

                        <div className="post-form-details">
                            <div className="form-caption">
                                <textarea type="text"
                                    value={this.state.caption}
                                    placeholder="Say Something..."
                                    onChange={this.update("caption")}
                                />
                            </div>
                            <div className="form-location">
                                <input type="text"
                                    value={this.state.location}
                                    placeholder="Location..."
                                    onChange={this.update("location")}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="post-btns">
                        <button onClick={this.closeForm} className="post-cancel-btn">Cancel</button>
                        <button className="post-submit-btn" onClick={this.handleSubmit}>{this.props.btnText}</button>
                    </div>
                </div>

                <div className="screen"
                    onClick={this.closeForm}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    formTitle: "Share Post",
    btnText: "Share"
});

export default connect(mapStateToProps)(SharePostForm);
