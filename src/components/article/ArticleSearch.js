import React, { Component } from 'react';

class ArticleSearch extends Component {
	constructor(props){
		super(props);
		this.state = {
			title:"",
			description:""

		}

	}
	
	handleChange = (event) => {
		const target = event.target
		const name = target.name
		const value = 	 target.value;
		var obj = {};
		obj[name] = value;
		this.setState(obj);
	}
	
	
	
	getSearchJson = ()=>{
		return {
			title: this.state.title,
			description: this.state.description
		
		}
	}
	
	searchArticle = () => {
		var json = this.getSearchJson();
		this.props.searchArticles(json);
	}
	
	render(){
		var  article = this.state;		
		return (
		<div className="well">
		<fieldset>
			<div className="form-search form-group">
				<div className="col-md-12">
					<div id="legend">
						<legend>Article Search</legend>
					</div>
					<div className="row">
						<div className="col-md-4">
							<div className="input-group svX3">
								<label className="input-group-addon imagetype-width" id="firstName-addon">Title</label> 
								<input className="form-control" type="text" id="title" name="title" value={article.title} onChange={this.handleChange}/>
							</div>
						</div>
						<div className="col-md-4">
							<div className="input-group svX3">
								<label className="input-group-addon imagetype-width" id="lastName-addon">Description</label> 
								<input className="form-control" type="text" name="description" value={article.description} onChange={this.handleChange}/>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="col-md-12">
					<button id="submit" onClick={()=>this.searchArticle()}
						className="btn btn-primary">Search</button>
					<button id="cancel" className="btn cancel">Cancel</button>
				</div>
			</div>
		</fieldset>

		</div>
		);
	}
	
}

export default ArticleSearch;
