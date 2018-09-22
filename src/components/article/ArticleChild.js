import React, { Component } from 'react';

class ArticleChild extends Component {
	constructor(props){
		super(props);
		this.state = {
				articles: this.props.articles,
			type: false,
		        msg: [],
		        description:"",
		        title:"",
				editing: false
		}
	}
	
	 deleteArticle(){
		 this.setState({type:false, msg:[] });
		 const url = window.baseApiUrl + '/delete_article.php';
		 const self = this;
		 var ajaxCall = window.ajaxCall;
		 var data = {"id":this.props.id};
		 window.bootbox.confirm({
		      title: 'Delete ',
		      message: 'Do you want to delete  ',
		      buttons: {
		        cancel: {
		          label: '<i className="fa fa-times"></i>' + 'Cancel'
		        },
		        confirm: {
		          label: '<i className="fa fa-check"></i>' + 'Confirm'
		        }
		      },
		      callback(result) {
			       if (result) {
			    	   const onSuccessMethod = data => {
			  			 self.props.deleteArticleBoard(self.props.index);
			  			
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
			   		ajaxCall(url, 'DELETE', data, onSuccessMethod, onFailMethod)
			        }
		      }
		 })
  }
  
   edit() {
    this.setState({ type: false, msg: [] })
    if (this.state.editing) {
      this.setState({ editing: false })
    } else {
      this.setState({ editing: true })
    }
  }
   
   renderNormal(){
		const ind = this.props.index + 1;
		return (

				<tr key={ind}>
					<td>{ind}</td>
					<td>{this.props.title}</td>
					<td>{this.props.description}</td>
					<td>{this.props.created}</td>
					<td>
					<a
						 href="javascript:void(0)" onClick={this.edit.bind(this)}>
							Edit </a></td>
					 <td>
					 	<a href="javascript:void(0)" onClick={this.deleteArticle.bind(this)}>
					 		Delete
					 	</a>
					 </td>
				</tr>
					
		)
  }
  
  changeStatus() {
    this.setState({ type: false, msg: [] })
    if (this.state.editing) {
      this.setState({ editing: false })
    } else {
      this.setState({ editing: true })
    }
  }
  
  renderForm(){
	   const ind = this.props.index + 1;
	    return (<tr key={ind}>
		<td>{ind}</td>
		<td>
          <input
            type="text"
            ref="title"
            className="form-control"
            defaultValue={this.props.title}
          /></td>
		<td>
				<textarea  type="text" ref="description" defaultValue={this.props.description}></textarea>
		</td>
		<td>{this.props.created}</td>
		<td>
			<a
				 href="javascript:void(0)" onClick={this.save.bind(this)}>
					Edit </a>
		</td>
		<td>
		 	<a href="javascript:void(0)" onClick={this.changeStatus.bind(this)}>
		 		Delete
		 	</a>
		</td>
	</tr>)
  }
  getArticleJson(){
		return {
				id:this.props.id,
				title:this.refs.title.value,
				description:this.refs.description.value
	
		}
  }
  save(e) {
	   e.preventDefault();
	  this.setState({type:false, msg:[] });
	   const url = window.baseApiUrl + '/update_article.php';
	   const title = this.refs.title.value;
	   const description = this.refs.description.value;
		const self = this;
		var ajaxCall = window.ajaxCall;
		//var data = {"id":this.props.id,"title":title,"description":description};
		var data = this.getArticleJson();
		const onSuccessMethod = data => {
			 window.scrollTo(0, 0);
			  this.setState({ editing: false });
			  self.props.updateArticleText(
				self.props.id,
		        title,
		        description,
				self.props.created,
		        self.props.index
		      )					
		}
		
		
		let onFailMethod = (err) => {
			 window.scrollTo(0, 0);
			 const errArr = []
		      if (err.responseJSON && err.responseJSON.details) {
		        err.responseJSON.details.forEach(item => {
		          errArr.push(item.message)
		        })
		      } else if (err.responseJSON) {
		        errArr.push(err.responseJSON.message)
		      } else {
		        errArr.push(err.responseText)
		      }
            self.props.updateError(errArr)
           }
		ajaxCall(url, 'POST', data, onSuccessMethod, onFailMethod)
		
  }
	render(){
		if (this.state.editing) {
      return this.renderForm()
    }
    return this.renderNormal()
	
		
	}
	
}

export default ArticleChild;