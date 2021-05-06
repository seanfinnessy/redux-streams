import React from 'react';
import ReactDOM from 'react-dom';

// createPortal has 2 params. What we want to show, and a reference to an HTML element we want to load the portal onto. (index.html new div with specific id).
// Inserts itself as a child to the div with id #modal.
//stopPropagation makes sure the event doesnt "bubble up". Aka the history.push wont travel down the "tree" of JSX. It will stop at the outer parent div.
const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
};

export default Modal;