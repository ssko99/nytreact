// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var History = require("./children/History");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({
    // Here we set a generic state associated with the number of clicks
    // Note how we added in this history state variable
    getInitialState: function() {
        return { 
          searchTerm: "", 
          results: {}, 
          beginYear: "", 
          endYear:"", 
          savedArticles: [] 
        };
    },
 componentDidMount: function() {
        helpers.getSaved()
      .then(function(articleData){
        this.setState({
          savedArticles: articleData.data
        });

      }.bind(this))
       
    },
    componentDidUpdate: function(prevProps, prevState)  {
      if(prevState.searchTerm != this.state.searchTerm){
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm, this.state.beginYear, this.state.endYear)
        .then(function(data){         
          if (data != this.state.results)
          {
            this.setState({
              results: data
            })
          }
        }.bind(this))
    }
  },
    saveArticle: function(title, date, url) {
      
    helpers.postSaved(title, date, url)
      .then(function(data){
        helpers.getSaved()
        .then(function(articleData){
          this.setState({
            savedArticles: articleData.data
          });

        }.bind(this))
      }.bind(this))

      
    },
    deleteArticle: function(title, date, url) {
      
      helpers.deleteSaved(title, date, url)
      .then(function(data){

      helpers.getSaved()
        .then(function(articleData){
          this.setState({
            savedArticles: articleData.data
          });

        }.bind(this))
      }.bind(this))
    },
    
    // This function allows childrens to update the parent.
setTerm: function(term, beginY, endY) {
    this.setState({
        searchTerm: term,
        beginYear: beginY,
        endYear: endY
    })
},
   

    render: function() {
      
    var bgColors= { "Default": "#20315A",
                    "White": "#ffffff",
                    "Blue": "#00B1E1",
                    "Cyan": "#37BC9B",
                    "Green": "#8CC152",
                    "Red": "#E9573F",
                    "Yellow": "#F6BB42",
                  };
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron" style={{backgroundColor: bgColors.Default, color: bgColors.White}}>
            <h1 className="text-center">
              <strong>
              <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
              </h1>
          </div>
          <div className="row">
              <div className="col-sm-12">
                <br/>              
                <Form setTerm={this.setTerm} />
              </div>
          </div>
          <div className="row">
              <div className="col-sm-12">
                <br/>              
              <Results results={this.state.results} saveArticle={this.saveArticle}/>
              </div>
          </div>
          <div className="row">
              <div className="col-sm-12">
                <br/>              
                <History savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle}/>
              </div>
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
