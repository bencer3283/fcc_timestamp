fetch('http://localhost:3000/_api/find-one-by-food', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    name: 'Gary', 
    age: '46', 
    favoriteFoods: [ 'chicken salad' ] })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));