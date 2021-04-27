import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  // this.props.MATCH comes from history object we passed down in App component. It is from the :id. In that obj it contains match.params and then our id.
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
  };

  render() {
    console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        {/*Field components in Redux Form will look at initialValues prop and compare to the "name" in the Field props. Those initialValues will be used for the values in Field. */}
        {/*Use lodash to pick out the object keys we want. Makes a NEW object. We dont want id or userid! */}
        <StreamForm 
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit} 
        />
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

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);