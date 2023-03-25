import React, { useContext, useState } from 'react'
import UserContext from '../../context/user/userContext'

const MainDetail = ({ user }) => {
  const userContext = useContext(UserContext)

  const [fo, setFo] = useState(false)
  const [bioval, setBioval] = useState('')
  const onBio = (e) => {
    if (fo) {
      setFo(false)
    } else {
      setFo(true)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    userContext.addBio(bioval)
    setFo(false)
  }

  if (user === null) return <div />
  const { followers, following, posts, bio, name } = user

  return (
    <div className='row'>
      <div className='col-md-6 '>
        <div className='text-center'>
          <img
            src='../../../picture.jpeg'
            alt='profilepic'
            className='rounded-circle'
          />
        </div>
      </div>
      <div className='col-md-6 text-center' style={{ marginTop: '5%' }}>
        <div className='row '>
          <div className='col-sm-4'>
            <strong>{posts.length}</strong>
            <p>Posts</p>
          </div>
          <div className='col-sm-4'>
            <strong>{following.length}</strong>
            <p>Following</p>
          </div>
          <div className='col-sm-4'>
            <strong>{followers.length}</strong>
            <p>Followers</p>
          </div>
        </div>
        <div>
          <h4 style={{ marginTop: '5%' }}>{name}</h4>
          <p>{bio}</p>
          {fo && (
            <form onSubmit={onSubmit}>
              <input
                type='text'
                name='bio'
                value={bioval}
                onChange={(e) => {
                  setBioval(e.target.value)
                }}
                style={{ border: 'none', borderBottom: '1px solid black' }}
              />
              <input
                className='btn btn-link'
                type='submit'
                value={bio ? 'Update' : 'Add'}
              />
            </form>
          )}
          <p
            onClick={onBio}
            className='btn-link'
            style={{ textAlign: 'right', padding: '5% 0' }}
          >
            Update/Add Bio
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainDetail
