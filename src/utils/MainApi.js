class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(name, password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "password": password,
        "email": email })
      })
    .then(res => {
      return this._checkResponse(res);
    })};

  authorize(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })};

  getContent(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })};

  setNewUserInfo(newValues) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({
        name: newValues.name,
        email: newValues.email
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })};

  createMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        "country": movieData.country,
        "director": movieData.director,
        "duration": movieData.duration,
        "year": movieData.year,
        "description": movieData.description,
        "image": `https://api.nomoreparties.co${movieData.image.url}`,
        "trailerLink": movieData.trailerLink,
        "nameRU": movieData.nameRU,
        "nameEN": movieData.nameEN,
        "thumbnail": `https://api.nomoreparties.co${movieData.image.url}`,
        "movieId": movieData.id
      })
      })
    .then(res => {
      return this._checkResponse(res);
    })};

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId._id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => {
      return this._checkResponse(res);
    })};
}


const mainApi = new MainApi({
  baseUrl: 'https://api.diplomayakushenkovm.nomoredomains.sbs',
});

export default mainApi;