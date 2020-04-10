import React from "react";

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      error: null,
      loading: false,
      items: [],
      message: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    const query = event.target.query.value;
    event.preventDefault();
    if (!query) {
      this.setState({
        query,
        items: [],
        message: "",
        totalPages: 0,
        totalResults: 0,
      });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        fetch(`${apiEndpoint}/search?track=${query}`)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log(result);
              this.setState({
                loading: false,
                items: result,
              });
            },
            (error) => {
              console.log(error);
              this.setState({
                loading: false,
                error,
              });
            }
          );
      });
    }

    this.setState({ query, loading: true });
  }

  render() {
    const { query, error, loading, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit} htmlFor="search-input">
            <label>
              Track:
              <input
                type="text"
                name="query"
                id="search-input"
                value={query}
                placeholder="Search..."
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {items.map((item) => (
            <ul style={{ listStyleType: "none" }}>
              <li key={item.name}>Name: {item.name}</li>
              <li key={item.album.name}>Album name: {item.album.name}</li>
              <li key={item.duration_ms}>Duration: {item.duration_ms}</li>
            </ul>
          ))}
        </div>
      );
    }
  }
}

export default SearchForm;
