

// create obj with methods for all api req
const Alc = {
  addAlc: (type, name, percentage) => {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url:'api/alcohol',
      method:'POST',
      data:''
    })
  },
  getAlc: () => {
    return $.ajax({
      url:'api/alcohol',
      method:'GET'
    })
  },
  deleteAlc: (id) => {
    return $.ajax({
      url:`api/alcohol:${id}`,
      method: 'DELETE', 
    })
  }
}


