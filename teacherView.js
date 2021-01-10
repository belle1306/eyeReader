import React from "react";
// import App from './App';

class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher : [],
      student : [],
      inputFullname : "",
      inputLevel  :""
      
    }
    this.getStudentList = this.getStudentList.bind(this);
    this.getTeacherList = this.getTeacherList.bind(this);
    this.getAssessmentList = this.getAssessmentList.bind(this);
    this.updateFullname = this.updateFullname.bind(this);
    this.updateLevel = this.updateLevel.bind(this);

  }
       
    
  
//   componentDidMount() {
//     fetch('/users')
//       .then(response => {
//         console.log(response);
//         return response.json();
//       })
//       .then(data => {
//       this.setState({
//         : data
//       });
// }

updateFullname(e) {
  e.preventDefault();
  this.setState({
    inputFullname: e.target.value
});
}

updateLevel(e) {
  e.preventDefault();
  this.setState({
    inputLevel : e.target.value
  });
}
  
    getStudentList() {
      // const apiURL = "http://localhost:5000/users/student"
      fetch("/users/student", {
        method: "GET", // get all students
        headers: {
          "Content-Type" : "application/json"
        }
      })
      .then(res => {
        console.log(res);
        return res.json();
        // console.log(this.state.student);
      
      })
      .then( data=>{
        console.log(data)
        this.setState({student : [this.state.student]})
      })
      .catch(error => {
      console.log(error);
        })
      }

      getTeacherList() {
        fetch("/users/teacher", {
          method: "GET", // get all students
          headers: {
            "Content-Type" : "application/json"
          }
        })
        .then(res => {
          console.log(res);
          return res.json();
          // console.log(this.state.student);
        
        })
        .then( data=>{
          console.log(data)
          this.setState({student : [this.state.teacher]})
        })
        .catch(error => {
        console.log(error);
          })
        }

      getAssessmentList() {
         fetch("/users/assesment",{
          method: "GET", // get all assesment
          headers: {
            "Content-Type": "application/json"
          },
          
       })
        .then(res => {
            console.log(res);
            return res.json();
          //console.log(this.state.student);
        })
        .then( data=>{
          console.log(data)
          // this.setState({student : [this.state.teacher]})
        })
        .catch(error => {
        console.log(error);
          })
        }


      addStudent() {
        fetch("/users/student", {
          method: "POST", //  adding new student
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: this.state.inputFullname,
            level: this.state.inputLevel            
          })
        })
          .then(res => {
            console.log(res.json);
            return res.json();
          })
          .then(data => {//have to be done in component
            console.log("data with id", data);
            const newStudent = [
              {
                id: data.insertId,
                fullname : this.state.inputFullname,
                Level: this.state.inputLevel
              }
            ];
            this.setState({
              student: [...this.state.student, ...newStudent]
            });
            console.log(this.state.student);
          })
          .catch(error => {
            console.log(error);
          }); 
      }
  
   

  render() {
    
    
    return (
          <div id ="container">
          <label>
            <h1>Assesment Results</h1>
            <div>
            
            <button onClick={e => this.getStudentList(e)}>Get Students List</button>
            <ul>{this.getStudentList}</ul>
            <button onClick={e => this.getAssessmentList(e)}>Get All Assessment</button>
            <button onClick={e => this.getTeacherList(e)}>Get Teacher List</button>
            </div>
            <label>
             
              
            Add New Student:
            <input
              type="text"
              placeholder="add full name here eg: Carol Lewis"
              defaultvalue={this.state.student}
              onChange={e => this.updateFullname(e)}/>
              <input width = "400px"
              type="text"
              placeholder ="add level(only numerical) here eg: 1 or 2"
              defaultvalue={this.state.student}
              onChange={e => this.updateLevel(e)}/>
           
          </label>
          <div>
          <button onClick={e => this.addStudent()}>Submit</button>
                         
            </div>      
          </label>
          <div>
           {this.state.student.map(item=>{
             const { _id, fullname, level } = item;
             return(
              <li key={_id}>
              <p>{fullname}</p>
            <p>{level}</p>  
              {item.value}
              </li>
              )  
           })
           }
                    
                </div>
                           
              )

             </div>
      
        
  
)}
}

export default TeacherView;
