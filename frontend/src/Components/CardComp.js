import React from 'react'

function CardComp(props) {
    
    let item = props.item;

  return (
    <div className="card" key={item._id} style={{
        border: '3px solid #1976d2', margin: '5px',
        width: "20rem"
      }}>
        <p>{item.name}</p>
        <p>{item.phone}</p>
        <p>{item.type}</p>
        <p>{item.email}</p>
        <p>{item.site}</p>
        <img className="activator" style={{
          objectFit: 'cover',
          width: '100px',
          height: '100px'
        }} src={item.image} />
      </div>
  )
}

export default CardComp