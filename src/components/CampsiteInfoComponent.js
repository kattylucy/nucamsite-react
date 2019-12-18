import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state={
            isModalOpen: false
        }
    }


    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render(){
        return(
        <React.Fragment>
            <Button outline color="secondary" onClick={() => this.setState({isModalOpen:true})}>
                <i className="fa fa-pencil" />
                Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Col>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" name="label" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" id="author" name="author"
                                className="form-control"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}>
                            </Control.text>
                              <Errors  className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label htmlFor="tex">Comments</Label>
                            <Control.textarea rows="6" model=".text" name="text" className="form-control">
                            </Control.textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button color="primary">Submit</Button>
                        </Col>
                    </Row>
                    
                </LocalForm>                    
            </ModalBody>
            </Modal>
        </React.Fragment>
        )
    }
}


  function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
             <Card>
                <CardImg  src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
            </div>
        );
    }

    function RenderComments({comments, addComment, campsiteId}){
        if(comments){
            return(
                <div className="col-md-5 m-1">
                    <h4 className="text-center"> Comments</h4>
                    {comments.map(comment => {
                        return(
                        <div key={comment.id} className="text-center">
                            <q><b>{comment.text}</b></q>
                            <p>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                        
                        );
                    })}
                    <div className="text-center">
                        <CommentForm campsiteId={campsiteId} addComment={addComment} />
                    </div>
                </div>
            );
        }
    }


       function CampsiteInfo(props){
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                                </Breadcrumb>
                                <h2>{props.campsite.name}</h2>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderCampsite campsite={props.campsite} />
                            <RenderComments 
                                comments={props.comments}
                                addComment={props.addComment}
                                campsiteId={props.campsite.id}
                            />
                        </div>
                        
                    </div>
                );
        }
        return <div />;
       }




export default CampsiteInfo;