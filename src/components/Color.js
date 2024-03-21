import React from 'react';

const Color = ({ models, handleColorClick }) => {
  return (
    <ul className='colors ps-0' style={{ display: 'flex', listStyleType: 'none' }}>
      {models?.map((model) => (
        <li 
          key={model.modelId} 
          style={{ 
            backgroundColor: model.color.image, 
            width: '20px', 
            height: '20px', 
            borderRadius: '50%', 
            margin: '-3px 5px -2000px 10px',
            cursor: 'pointer'
          }}
          onClick={() => handleColorClick(model.modelId)}
        ></li>
      ))}
    </ul>
  );
};

export default Color;
