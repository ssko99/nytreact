// Include React
var React = require("react");

// Creating the Form component
var Form = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "", beginYear:"", endYear:"" };
  },

  // This function will respond to the user input
  handleChange: function(event) {
      var newState = {};
      newState[event.target.id] = event.target.value;
      this.setState(newState);
  },
  

  // When a user submits...
  handleSubmit: function(event) {
    // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term, this.state.beginYear, this.state.endYear);    
    this.setState({ term: "", beginYear: "", endYear:"" });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 className="panel-title text-center"> <strong>Search</strong></h2>
        </div>
        <div className="panel-body text-center">
          <form>
            <div className="form-group">
              <h4 className="">
                <strong>Topic</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                className="form-control text-center"
                id="term"
                onChange={this.handleChange}
                required
              />
              <br />

             
            </div>
            <div className="form-group">
            <h4 className="">
                <strong>Start Year :</strong>
              </h4>              
                <input
                value={this.state.beginYear}
                type="text"
                className="form-control text-center"
                id="beginYear"
                onChange={this.handleChange}
              />
              </div>
              <br />

             
              <div className="form-group">
              <h4 className="">
                <strong>End Year :</strong>
              </h4>
                
                <input
                value={this.state.endYear}
                type="text"
                className="form-control text-center"
                id="endYear"
                onChange={this.handleChange}
              />
              </div>
               <button
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
          </form>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Form;
