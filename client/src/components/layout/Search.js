import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/user/userContext'
import { Link } from 'react-router-dom'

const Search = () => {
  const userContext = useContext(UserContext)

  const { getAllUsers, filtered, loadUser, otheruser, user } = userContext

  // const [search, setSearch] = useState("");
  const onSubmit = (e) => {
    e.preventDefault()
    getAllUsers()
  }

  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [otheruser]);

  return (
    <div>
      <form
        className='col-md-4 my-auto'
        style={{ margin: '0 auto' }}
        onSubmit={onSubmit}
      >
        {/* <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Users..."
          />
        </div> */}

        <input
          type='submit'
          value='Get All Users'
          className='btn btn-primary btn-block'
          style={{ margin: '10% auto' }}
        />
      </form>
      <div className='text-center'>
        {filtered.length > 0 &&
          filtered.map((userr) => {
            if (userr._id !== user._id) {
              return (
                <div className='my-auto'>
                  <p className='btn btn-light'>
                    <Link to={`/profile/${userr._id}`}>{userr.name}</Link>
                  </p>
                </div>
              )
            } else {
              return <span />
            }
          })}
      </div>
    </div>
  )
}

export default Search
