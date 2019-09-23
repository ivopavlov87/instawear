import React from 'react';
import { Link } from 'react-router-dom';

class CreateCommentForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { body: "" }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    update(field) {
        return e => this.setState({[field]: e.target.value})
    }

    handleSubmit() {
        this.props.createComment({ 
            post_id: this.props.postId, 
            body: this.state.body 
        });

        this.setState({ body: "" });
    }

    render() {
        let createCommentButton;

        if (this.state.body === "") {
            createCommentButton = (
                <p className="blur-opacity" id="create-comment" onClick={this.handleSubmit}>
                    Post
                </p>
            )
        } else {
            createCommentButton = (
                <p className="change-opacity" id="create-comment" onClick={this.handleSubmit}>
                    Post
                </p>
            );
        }

        return (
            <div className="comment-form">
                <Link to={`/user/${this.props.currentUser.id}`}>
                    <img src={this.props.currentUser.profilePhoto} />
                </Link>

                <div className="comment-form-line">
                    <textarea 
                        placeholder="Add a comment..."
                        onChange={this.update("body")}
                        value={this.state.body}>
                    </textarea>

                    {createCommentButton}
                </div>
            </div>
        );
    }
}

export default CreateCommentForm;