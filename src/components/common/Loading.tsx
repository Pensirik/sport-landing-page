import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading-component">
      <div className="sk-chase">
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
        <div className="sk-chase-dot" />
      </div>
    </div>
  );
};

export default Loading;
