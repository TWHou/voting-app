import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewPoll extends Component {
  state = {
    title: '',
    options: [{name: ''}, {name: ''}],
    err: {}
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
    if (newOpt.length > 2) {
      newOpt.pop();
    }
    this.setState({options: newOpt});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({err: {}});
    const title = this.state.title;
    const options = this.state.options
    .map((option) => ({name: option.name.trim()}))
    .filter((option) => option.name);
    if (!title) {
      this.setState({err: {title: 'Title is required.'}});
    }
    if (options.length < 2) {
      this.setState({err: {options: 'Need at least 2 options'}});
    }
    if (this.state.err !== {}) {
      this.props.onSubmit({title, options});
    }
  }

  render() {
    const titleErr = this.state.err.title || this.props.pollErr;
    const optClass = this.state.err.options ? 'form-group has-danger' : 'form-group';
    const options = this.state.options.map((option, i) => (
      <div className={optClass} key={i}>
        <label className="sr-only" htmlFor={'option' + (i+1)}>Option {i+1}</label>
        <input
          type="text"
          className="form-control"
          id={'option' + (i+1)}
          value={option.name}
          onChange={e => this.updateOption(e, i)}
          name={'option' + (i+1)}
          placeholder={'Option ' + (i+1)}/>
      </div>
    ));
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="row no-gutters">
          <div className="col-8">
            <div className={titleErr ? 'form-group has-danger' : 'form-group'}>
              <label htmlFor="title">Title</label>
              <input 
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.updateTitle}
                placeholder="Title for Your Poll"
              />
              {titleErr && (
                <div className="form-control-feedback">
                  {this.state.err.title}
                  {this.props.pollErr}
                </div>
              )}
            </div>
            <label>Options</label>

            {options}
            <p className="text-danger">{this.state.err.options}</p>
          </div>
          <div className="col-4 px-1 mt-5">
            <input className="btn btn-primary btn-block" type="submit" value="Add Poll" />
            <div className="btn-group-vertical w-100 my-1">
              <button type="button" className="btn btn-secondary" onClick={this.addOpt}>+ Option</button>
              <button type="button" className="btn btn-secondary" onClick={this.removeOpt}>- Option</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

NewPoll.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pollErr: PropTypes.string
};

export default NewPoll;