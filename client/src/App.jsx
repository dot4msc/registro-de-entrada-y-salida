import EmployeeSection from "./components/EmployeeSection";

function App() {
  const employees = [
    "Adolfo",
    "Andreina",
    "Alfredo",
    "Carlos",
    "Johan",
    "Mariano",
    "Miguel",
    "Omar",
    "Vicente"
  ]
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10">Entrada y Salida GreenRover</h1>
      <div className="flex justify-center bg-gray-100 py-8">
        <div className="grid grid-cols-3 gap-12">
        {employees.map((name, index) => (
         <EmployeeSection key={name + index} name={name}/>
         ))}
        </div>
      </div>  
    </div>
  )
}

export default App
