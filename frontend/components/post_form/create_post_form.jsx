import React from 'react';

class CreatePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.post;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.renderSignupForm = this.renderSignupForm.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleFile(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ photo: file, preview: fileReader.result});
        };
        if (file) {
            fileReader.readAsDataURL(file);

        }

        e.target.value = "";
    }

    closeForm() {
        this.setState({
            caption: '',
            location: '',
            photo: null,
            preview: null
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let button = e.target;
        let parent = button.parentElement;
        let loading = document.createElement('p');
        loading.innerText = 'Uploading...';
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
                    photo: null,
                    preview: null
                });
            });
    }

    popUp() {
        if (!this.state.photo) {
            return <div></div>
        } else {
        return (
            <div className="upload-frame">
                <div className="upload-form">

                    <div className="post-header">
                        <p className="post-title">{this.props.formTitle}</p>
                        <a className="close" onClick={this.closeForm}></a>
                    </div>

                    <div className="post-content">
                        <div className="preview-img">
                            <img className="preview" src={this.state.preview} />
                        </div>

                        <div className="post-form-details">
                            <div className="form-location">
                                <input type="text"
                                    value={this.state.location}
                                    placeholder="Location..."
                                    onChange={this.update("location")}
                                />
                            </div>
                            <div className="form-caption">
                                <textarea type="text"
                                    value={this.state.caption}
                                    placeholder="Say Something..."
                                    onChange={this.update("caption")}
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

    renderPostForm() {
        return (
            <label className="fancy-plus-button">
                <img src="/images/add-button.png" alt="create a post"/>
                <input type="file"
                    accept="image/*"
                    onChange={this.handleFile} 
                    />              
            </label>
            
        );
    }

    renderSignupForm() {
        this.props.history.push("/signup");
    }

    render() {
        if (this.props.currentUser) {
            return (
                <div>
                    {this.renderPostForm()}
                    <div id="new-post" className="add-post-btn">
                        {this.popUp()}
                    </div>
                </div>
            ); 
        } 
    }
}

export default CreatePostForm;