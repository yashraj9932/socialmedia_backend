import React from 'react'

const UserPosts = ({ source }) => {
  return (
    <div className='col-md-4 text-center' style={{ marginTop: '2%' }}>
      <div>
        <img
          src={source}
          alt='imag-post'
          style={{
            // height: "100%",
            // weight: "320px",
            maxWidth: '100%',
            maxHeight: '320px',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
      </div>
    </div>
  )
}

export default UserPosts
