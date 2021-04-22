import React from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        {this.props.stream.title}
      </div>
    );
  };
}

// ownProps to call the props object in our component
const mapStateToProps = (state, ownProps) => {
  return {
    // using Bracket Notation. Used for accessing object properties. object["foo"] = object.foo.
    stream: state.streams[ownProps.match.params.id] 
  };
}

export default connect(mapStateToProps, {fetchStream})(StreamEdit);