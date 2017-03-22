// Include React
var React = require("react");

var History = React.createClass({
  handleClick: function(item, event){
    this.props.deleteArticle(item.title, item.date, item.url);
    
  },

  render: function() {    
     if (this.props.savedArticles.length === 0) {
      return (<div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">
          <strong>Search History</strong></h3>
        </div>
        <div className="panel-body text-center">
         </div>
      </div>
        );
     } else {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">
          <strong>Search History</strong></h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.savedArticles.map(function(search, i) {
            return (
              <div className="well">
                  <span><em>{search.title}</em></span>
                  <button className="btn btn-default btn-danger pull-right" onClick={this.handleClick.bind(this, search)}>Delete</button>

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
module.exports = History;
