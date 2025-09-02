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
async function getData(endpoint) {
  try {
    const peticion = await fetch(`http://localhost:3001/${endpoint}`);
    const respuesta = await peticion.json();
    console.log(respuesta);
    return respuesta;
  } catch (error) {
    //console.error("Error en getData:", error);
    return [];
  }
}
async function patchData(obj,endpoint,id) {
  try {
      const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`,{
          method: 'PATCH',
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
async function deleteData(endpoint,id) {
  try {
      const peticion = await fetch(`http://localhost:3001${endpoint}/${id}`,{
          method: 'DELETE',
          headers:{
              'Content-Type': 'application/json'
          }
      })
      const respuesta = await peticion.json()
      console.log(respuesta);
      return respuesta
  } catch (error) {
    console.error(error);
  }
}
export {postData,getData,patchData,deleteData}