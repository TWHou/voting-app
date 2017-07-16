import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VoteForm extends Component {
  state = {
    selected: '',
    input: ''
  }

  handleSelect = (event) => {
    this.setState({selected: event.target.value, input: ''});
  }

  handleNewOpt = (event) => {
    this.setState({
      selected: event.target.value,
      input: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input) {
      this.props.onVote(this.state.selected, true);
    } else {
      this.props.onVote(this.state.selected);
    }
    this.setState({selected:'', input:''});
  }

  render() {
    return (
      <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
        <div className="d-flex flex-wrap justify-content-around" data-toggle="buttons">
          {this.props.options.map((option) => (
            <label 
              className={this.state.selected === option ? 'm-2 btn btn-secondary active' : 'm-2 btn btn-secondary'}
              key={option}
            >
              <input
                type="radio"
                autoComplete="off"
                value={option}
                checked={this.state.selected === option}
                onChange={this.handleSelect}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="form-group row">
          <label htmlFor="new-option" className="col-4 col-form-label">
            Add Your Own:
          </label>
          <div className="col-8">
            <input
              className="form-control"
              type="text"
              name="new-option"
              id="new-option"
              value={this.state.input}
              onChange={this.handleNewOpt}
            />
          </div>
        </div>
        <button className="btn btn-default" type="submit">Vote</button>
      </form>
    );
  }
}

VoteForm.propTypes = {
  options: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired
};

export default VoteForm;