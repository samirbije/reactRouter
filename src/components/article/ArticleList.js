import React, { Component } from 'react';
import ArticleChild from './ArticleChild';
import ReactPaginate from 'react-paginate';
import Message from '../message/Message';

class ArticleList extends Component {
	constructor(props){
		super(props);
		this.state = {
			articles: this.props.articles,
			type: false,
		        msg: [],
		        description:"",
		        title:"",
				 page:1,
				    typeEdit: false,
				      msgEdit: []

		}
	}
	
	componentWillReceiveProps(nextProps){
		this.setState({
			articles: nextProps.articles
		})
	}
	 handleChange(e) {
       this.setState({[e.target.name]: e.target.value});
   }
	   getArticleJson(){
		return {
				
				title:this.state.title,
				description:this.state.description
	
		}
   }
	
	add(e) {
			e.preventDefault();
			this.setState({type:false, msg:[] });
			const url = window.baseApiUrl + '/create_article.php';
			const self = this;
			var ajaxCall = window.ajaxCall;
			var data = this.getArticleJson();
			console.log(data);
			const onSuccessMethod = data => {
			window.scrollTo(0, 0);
			const arr = self.state.articles
			arr.push(data)
			console.log(arr);
			self.setState({ articles: arr })
			self.setState({description:"",title:""});
			window.$('#ModalForm').modal('hide');
			
		}
		
		
		let onFailMethod = (err) => {
			 window.scrollTo(0, 0);
            var errArr = [];
            if(err.responseJSON && err.responseJSON.details) {
                err.responseJSON.details.forEach(function (item) {
                    errArr.push(item.message);
                });
            }else if(err.responseJSON){
                errArr.push(err.responseJSON.message);
            }else {
                errArr.push(err.responseText);
            }

            self.setState({type:true});
            self.setState({msg:errArr});
        }
		ajaxCall(url, 'POST', data, onSuccessMethod, onFailMethod)
  }
  
    removeArticle(i) {
    const arr = this.state.articles;
    arr.splice(i, 1)
    this.setState({ articles: arr })
  } 
  
  updateArticle(id, newTitle, newDescription,newCreated, i) {
    const arr = this.state.articles;
    arr[i] = {
      id,
      title: newTitle,
      description: newDescription,
	  created:newCreated
    }

    this.setState({ articles: arr })
    this.setState({msgEdit: [' Record ' + i  + ' Updated  successfully ']});			
    this.setState({ typeEdit: false});
  }
  
  updateError(errArr) {
	    window.scrollTo(0, 0);
	    this.setState({ typeEdit: true });
	    this.setState({ msgEdit: errArr });
	  }
  
   changePage(page) {
       let page1 = page.selected+1;
       this.setState({page: page1});
   }
	render(){
	var data = this.state.articles;
	var newData = this.state.articles.concat([data]);  
	let per_page = window.per_page;
        const pages = Math.ceil(this.state.articles.length/per_page);
        const current_page = this.state.page;
        const start_offset = (current_page-1)*per_page;
        let start_count = 0; 

		
		return (
		<div className="well">
		<Message
        errors={this.state.msgEdit}
        type={this.state.typeEdit}
      />
			<input type="text" className="search" placeholder="Search for..."></input>
			<table id="userTable" className="table table-bordered table-stripped results">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Description</th>
						<th>Created Date</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{newData && newData.length > 0 ? newData.map((item, idx) => {
						if(idx >= start_offset && start_count<per_page){
							start_count++;	
						return (
						<ArticleChild 
							key={idx} 
							index={idx} 
							id = {item.id}
							title = {item.title} 
							description={item.description} 
							created= {item.created} 
							deleteArticleBoard={this.removeArticle.bind(this)}
							updateArticleText={this.updateArticle.bind(this)} 
							updateError={this.updateError.bind(this)}
						/>
						)}
					})
					:null}
				</tbody>
			</table>
			<center>
            {this.state.articles.length > 0 ?
                <ReactPaginate previousLabel={"<<"}
                               nextLabel={">>"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={pages}
                               marginPagesDisplayed={5}
                               pageRangeDisplayed={per_page}
								onPageChange={this.changePage.bind(this)}
                               containerClassName={"pagination pg-amber"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
                :''}
        </center>
			<fieldset>
			<center>
                <div style={{ width: '100%', margin: '0 auto' }}>
                  <button
                    type="button"
                    className="btn btn-primary mt-10 pull-right"
                    data-toggle="modal"
                    data-target=".bs-example-modal-lg">
                  Add New
                  </button>
                </div>
              </center>
			</fieldset>
			 <div
                className="modal fade bs-example-modal-lg"
                tabIndex="-1"
                id="ModalForm"
                role="dialog"
                aria-labelledby="myLargeModalLabel">
                <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content panel panel-default">
                <Message
			    errors={this.state.msg}
			    type={this.state.type}
				/>
				<center>
                   <h3>Add New</h3>
                    </center>
					<div className="row line-1">
                        <div className="form-group col-md-8">
                          <h5>Title</h5>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
							value={this.state.title} onChange={this.handleChange.bind(this)}
                          />
                        </div>
						
                        <div className="form-group col-md-6">
                          <h5>Description</h5>
                          <textarea name='description'  onChange={this.handleChange.bind(this)} placeholder="Type description here..."></textarea>
                        </div>
                      </div>
					  <div className="center">
                        <button
                          type="button"
                          className="btn btn-lg button-medium"
						   onClick={this.add.bind(this)}
						  >
							Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-lg button-medium second"
                          data-dismiss="modal"
                        >
                        Close
                        </button>
                      </div>
				</div>
                 </div>
				  </div>
		</div>
		);
	}
	
}

export default ArticleList;
