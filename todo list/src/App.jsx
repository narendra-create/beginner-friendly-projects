import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Button from "./components/button"
import { v4 as uuidv4 } from 'uuid';
import { IoAdd } from "react-icons/io5";
import { MdDelete, MdModeEditOutline } from "react-icons/md";






function App() {

  const [onetodo, setonetodo] = useState("") // this state only stores one task at time and tasks come here by add
  const [todos, settodos] = useState([]) //for showing all the tasks this state stores all tasks
  const [done, setdone] = useState(true)
  const [istodoLoaded, setistodoLoaded] = useState(false);


  useEffect(() => {
    if (istodoLoaded) {
      localStorage.setItem("todoapp", JSON.stringify(todos));
      localStorage.setItem("showCompleted", JSON.stringify(done)); // <-- Save 'done' checkbox state
    }
  }, [todos, done]);




  useEffect(() => {
    let data = localStorage.getItem("todoapp");
    let showDone = localStorage.getItem("showCompleted");
    if (data) {
      settodos(JSON.parse(data));
    }
    if (showDone !== null) {
      setdone(JSON.parse(showDone));
    }
    setistodoLoaded(true);
  }, []);



  const togglecheck = (e) => {
    let isdone = !done
    setdone(isdone)
  }



  const handelEdit = (e, id) => {
    const task = todos.filter(item => item.id === id)
    setonetodo(task[0].onetodo)

    //delete the og
    let index = todos.findIndex(item => item.id === id)
    let newdeleted = [...todos]
    newdeleted.splice(index, 1);
    settodos(newdeleted);


  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handelAdd();
    }
  };

  const handelDelete = (e, id) => {
    let index = todos.findIndex(item => item.id === id)
    let newdeleted = [...todos]
    newdeleted.splice(index, 1);
    settodos(newdeleted);


  }
  const handelAdd = () => {
    settodos([...todos, { id: uuidv4(), onetodo, isCompleted: false }])
    setonetodo("")
    console.log(todos)


  }

  const handelChange = (e) => {
    setonetodo(e.target.value)
  }

  const handelCheck = (e) => {
    let id = e.target.name //getting the id of checkbox
    let index = todos.findIndex(item => {
      return item.id === id;
    }) // finding the index inside todos array which matches our id variable because todos is array of many objects
    let newtodos = [...todos]; //getting the og todos array
    newtodos[index].isCompleted = !newtodos[index].isCompleted; //going inside og array and going inside the index and then going inside iscompleted then setting the iscompleted opposite by putting ! in front of it
    settodos(newtodos); //updating the og one with newtodos

  }

  return (
    <>
      <Navbar/>
      <div id="parent" className="w-full items-center h-[54rem] pb-8 flex justify-center font-serif">
        <div id="background" className="z-0 border drop-shadow-md border-black shadow-2xl opacity-60 w-[93%] mt-96 min-h-[50rem] rounded-xl absolute"></div>
        <div className="z-10  w-[90%] h-[50rem] rounded-xl" id="todoid">
          <h3 className="self-center justify-self-center pl-32 border-b-2 px-3 text-lg drop-shadow-lg border-black">Todo List</h3>
          <div id="adding" className=" w-[100%] sm:w-[85%] m-auto my-24 lg:my-7 mt-14 h-12 rounded-lg flex flex-row gap-2">
            <input type="text" onKeyDown={handleKeyDown} placeholder="Enter Tasks" onChange={handelChange} value={onetodo} className="rounded-lg w-full lg:w-[85%] px-8 text-xl drop-shadow-sm border border-zinc-200 shadow-md focus:border focus:border-action focus:outline-none" name="task" id="taskadd" />
            <button className="bg-action w-14 h-11 rounded-lg text-white font-bold cursor-pointer hover:border self-center hover:border-slate-700" onClick={handelAdd} ><IoAdd  className="text-2xl"/>
            </button>
          </div>
          <div id="showing">
            <div id="filter" className=" items-center flex flex-row gap-3 w-[85%] m-auto mb-10">
              <input type="checkbox" name="Completed" checked={done} onChange={togglecheck} id="Completed" className="appearance-none border border-white inset-0 rounded-md w-5 h-5 bg-white checked:bg-success  checked:border shadow-md checked:border-slate-400" />
              <div className="font-bold text-xl">Show Completed Tasks🔻</div>
            </div>
            <div id="below-your-tasks" className="w-[90%] overflow-auto h-[28rem] pb-20 pt-5 rounded-xl mx-auto">
              <div className="text-start px-7 lg:px-20 mb-8 pt-8 mx-auto border-t-2 text-black border-black text-2xl  font-semibold w-[92%]">------ Your Tasks ------</div>
              {todos.length === 0 && <div className="mx-auto w-72 font-bold text-xl bg-master py-5 px-12 rounded-2xl text-center">No Todos !!  Add some From above👆</div>}
              {todos.map(item => {
                return (done || !item.isCompleted) && <div key={item.id} id="content" className="mb-5 lg:mb-6 shadow-md hover:bg-masterbeta hover:shadow-master shadow-master bg-master lg:h-14 mt-4 w-full lg:w-[85%] mx-auto rounded-lg">
                  {/* mistake i forgot to  add return here */}
                  <div id="onebyone" className="flex flex-row items-start gap-5 justify-between px-4 py-3 w-full">
                    <div id="dummy" className="flex items-center w-[48rem] gap-3">
                      <input type="checkbox" onChange={handelCheck} checked={item.isCompleted} name={item.id} id="completedone" className="w-5 h-5 accent-blue-600 rounded" />
                      <div className={item.isCompleted ? "line-through font-bold decoration-cone decoration-lime-600 decoration-2 break-words" : "font-bold break-words"}>{item.onetodo}</div>
                    </div>
                    <div id="btns" className="flex gap-2 flex-row">
                      <Button text={<MdModeEditOutline/>} onClick={(e) => handelEdit(e, item.id)} />
                      <button onClick={(e) => handelDelete(e, item.id)} className=" bg-delete w-8 h-7 hover:bg-red-800 rounded-md text-white font-bold cursor-pointer delay-75 ease-in-out"><MdDelete/></button>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


//EDit wala function 
// completed task hide or dikhane wala function

//localstorage ka mamla