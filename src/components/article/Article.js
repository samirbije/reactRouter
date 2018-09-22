import React, { Component } from 'react';
import ArticleList from './ArticleList';
import ArticleSearch from './ArticleSearch';

class Article extends Component {
	constructor(props){
		super(props);
		this.state = {
			userPage:false,
			userObject:{},
			articles:[]
		}
		this.searchArticles.bind(this);
		this.getAllArticles.bind(this);
	}
	
	componentDidMount(){
			this.getAllArticles();
	}
	

	
	getAllArticles = () => {
		const url = window.baseApiUrl + '/read_articles.php';
		const self = this;
		var ajaxCall = window.ajaxCall;
		const onSuccessMethod = data => {
			self.setState({
				articles: data,
				userPage:true
			});
		}
		
		const onFailMethod = err => {
			console.log("fail");
			console.log(err.responseText)
		}
		
		ajaxCall(url, 'GET', null, onSuccessMethod, onFailMethod)
	}
	
	 getArticleJson(){
		return {				
			title:this.state.title,
			description:this.state.description	
		}
   }
	searchArticles(json){
		const url = window.baseApiUrl + '/read_one.php';
		const self = this;
		var ajaxCall = window.ajaxCall;
		const onSuccessMethod1 = data => {
			self.setState({
				articles: data,
				userPage:true
			});
		}
		
		const onFailMethod1 = err => {
			console.log(err.responseText)
		}
		
		ajaxCall(url, 'POST', json, onSuccessMethod1, onFailMethod1);
	}
	
	render(){
		return(
			<div className="container" >
				<ArticleSearch searchArticles={this.searchArticles.bind(this)}/>
				<ArticleList articles={this.state.articles} getAllArticles={this.getAllArticles.bind(this)} />
			</div>
		)
		
	}
}

export default Article;