import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VoteForm extends Component {
  state = {
    selected: '',
    input: '',
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
    this.props.onVote(this.state.selected);
    this.setState({selected:'', input:''});
  }

  render() {
    return (
      <form className="d-flex flex-column align-items-center" onSubmit={this.handleSubmit}>
        <div className="btn-group-vertical" data-toggle="buttons">
          {this.props.options.map((option) => (
            <label 
              className={this.state.selected === option ? 'btn btn-secondary active' : 'btn btn-secondary'}
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
        {localStorage.getItem('token') && (
          <input
            className="form-control"
            type="text"
            name="new-option"
            id="new-option"
            placeholder="Add Your Own"
            value={this.state.input}
            onChange={this.handleNewOpt}
          />
        )}
        <button className="btn btn-default btn-block" type="submit">Vote</button>
      </form>
    );
  }
}

VoteForm.propTypes = {
  options: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default VoteForm;