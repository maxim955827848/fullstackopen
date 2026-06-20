const SearchBox = ({ term, onTermChange }) => (
  <div>
    find countries <input value={term} onChange={onTermChange} />
  </div>
)

export default SearchBox