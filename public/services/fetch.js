async function postData(obj,endpoint) {
  try {
      const peticion = await fetch(`http://localhost:3001/${endpoint}`,{
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
      })
      const respuesta = await peticion.json()
      console.log(respuesta);
      return respuesta
  } catch (error) {
    console.error(error);
  }
}
export {postData}