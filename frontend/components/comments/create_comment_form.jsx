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
        return (
            <div className="comment-form">
                <Link to={`/profile/${this.props.currentUser.id}`}>
                    <img src={this.props.currentUser.profilePhoto} />
                </Link>

                <div className="comment-form-line">
                    <textarea 
                        placeholder="Leave a comment here"
                        onChange={this.update("body")}
                        value={this.state.body}>
                    </textarea>

                    <p onClick={this.handleSubmit}>
                        Comment
                    </p>
                </div>
            </div>
        );
    }
}

export default CreateCommentForm;