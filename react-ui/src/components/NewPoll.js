import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewPoll extends Component {
  state = {
    title: '',
    options: [{name: ''}, {name: ''}]
  }

  updateTitle = e => {
    this.setState({title: e.target.value});
  }

  updateOption = (e, i) => {
    let newOpt = this.state.options;
    newOpt[i] = {name: e.target.value};
    this.setState({options: newOpt});
  }

  addOpt = () => {
    let newOpt = this.state.options;
    newOpt.push({name: ''});
    this.setState({options: newOpt});
  }

  removeOpt = () => {
    let newOpt = this.state.options;
    newOpt.pop();
    this.setState({options: newOpt});
  }

  handleSubmit = e => {
    e.preventDefault();
    const title = this.state.title;
    const options = this.state.options;
    this.props.onSubmit({title, options});
  }

  render() {
    const options = this.state.options.map((option, i) => (
      <div className="form-group" key={i}>
        <label htmlFor={'option' + (i+1)}>Option {i+1}</label>
        <input
          type="text"
          className="form-control"
          id={'option' + (i+1)}
          value={option.name}
          onChange={e => this.updateOption(e, i)}
          name={'option' + (i+1)}
          placeholder="Option"/>
      </div>
    ));
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.updateTitle}
              placeholder="Title for Your Poll" />
          </div>
          {options}
          <input type="submit" value="Add Poll" />
        </form>
        <button onClick={this.addOpt}>Add Option</button>
        <button onClick={this.removeOpt}>Remove Option</button>
      </div>
    );
  }
}

NewPoll.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewPoll;