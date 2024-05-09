import React from 'react';

function ButtonWithContent({ icon, content }) {
  return (
    <button>
        <div className="d-flex align-items-center mb-2">
        <div className="me-2">{icon}</div>
        <div>{content}</div>
    </div>
  </button>
    
  );
}

export default ButtonWithContent;