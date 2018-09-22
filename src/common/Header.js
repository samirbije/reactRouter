import React from 'react';

const Header = () => (
  <header>
	<nav className="navbar navbar-inverse">
		<div className="container-fluid">
		    <div className="navbar-header">
			    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
	                <span className="icon-bar"></span>
	                <span className="icon-bar"></span>
	                <span className="icon-bar"></span>
	            </button>
	  			<a className="navbar-brand" href="/pages/article"><strong>  Articles </strong></a>
			</div>
		</div>
	</nav>
  </header>
)

export default Header;