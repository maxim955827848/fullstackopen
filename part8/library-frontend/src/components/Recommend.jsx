import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const userResult = useQuery(ME, { skip: !props.show })
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (userResult.data && userResult.data.me) {
      getBooks({ variables: { genre: userResult.data.me.favoriteGenre } })
    }
  }, [userResult.data, getBooks])

  if (!props.show) return null
  if (userResult.loading || (booksResult && booksResult.loading)) return <div>loading...</div>

  const favoriteGenre = userResult.data?.me?.favoriteGenre
  const books = booksResult.data?.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
