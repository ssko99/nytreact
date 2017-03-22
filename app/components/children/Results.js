// Include React
var React = require("react");
var helpers = require("../utils/helpers");
// Creating the Results component
var Results = React.createClass({
    getInitialState: function(){
    return {
      title: "",
      url: "",
      pubdate: "",
    }
  },

  handleClick: function(item, event){
    this.props.saveArticle(item.headline.main, item.pub_date, item.web_url);
  },


  // Here we render the function
  render: function() {
    
    if (!Array.isArray(this.props.results)){
      return (<div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">
            <strong>Results</strong></h3>
          </div>
          <div className="panel-body text-center"> 
           </div>
      </div>
          ) 
    } else {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center">
            <strong>Results</strong></h3>
          </div>
          <div className="panel-body text-center">         
            {this.props.results.map(function(search, i) {
              return (
                <div className="well">                
                  <button className="btn btn-default btn-info pull-right" onClick={this.handleClick.bind(this, search)}>
                  Save</button>
                    <p key={i}>{search.headline.main} - {search.date}</p>
                    <p>Date Published: {search.pub_date}</p>
                </div>
              );
            }, this)}         
        </div>
      </div>
    );
    }
  }
});

// Export the component back for use in other files
module.exports = Results;
