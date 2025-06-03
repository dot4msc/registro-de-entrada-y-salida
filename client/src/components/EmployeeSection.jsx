function EmployeeSection({name}) {
  const onCheckIn = async (name) => {
    await fetch('https://registro-de-entrada-y-salida-server.onrender.com/api/checkin', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({name})
    })
  }

  const onCheckOut = async (name) => {
    await fetch('https://registro-de-entrada-y-salida-server.onrender.com/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({name})
    })
  }

  return (
    <div className="box-border inline-block mx-15">
      <h2 className="text-2xl font-bold text-center">{name}</h2>
      <div>
        <button onClick={() => {onCheckIn(name)}} className="mx-5 my-5 bg-purple-800 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 text-white px-4 py-2 rounded"> Entrada </button>
        <button onClick={() => {onCheckOut(name)}}className="mx-5 my-5 bg-purple-800 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 text-white px-4 py-2 rounded"> Salida </button>
      </div>
    </div>
  )
}

export default EmployeeSection