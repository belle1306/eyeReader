import React from 'react';
import { WebGazeContext } from './webgazecontext';
import ashton from './ashton';
import TeacherView from './components/teacherView';
import webgazer from 'webgazer';
import './App.css';


import Script from 'react-load-script'
// var webgazer;

class WebGazeLoader extends React.Component {
  constructor() {
    super();
    this.state = {
      WebGazeLoader : true,
      context: {x: -1, y: -1}
    };
  }

  handleScriptLoad() {
    webgazer.setGazeListener((data, elapsedTime) => {
      if (data == null) {
        return;
      }
      this.setState({context: webgazer.util.bound(data)})
    }).begin();
    alert("Ready to read?click okay, recording will start")
    console.log('is recording')
  }

  handleScriptError() {
    console.log('error');
  }

  showTeacherView(){
    this.setState({WebGazeLoader : false});
  }


  render() {
    // const teacherpage = TeacherView
    return (
      <div>
    {(!this.state.WebGazeLoader)?
        <TeacherView/> 
    :
      <WebGazeContext.Provider value={this.state.context}>
        <Script
          url="https://webgazer.cs.brown.edu/webgazer.js"
          onLoad={this.handleScriptLoad.bind(this)}
          onError={this.handleScriptError.bind(this)}
        />
        <div id="container">
      <h1>Eye Can Read</h1>
       <h2>Welcome to eye-tracking based rapid reading assesment!</h2> 
       </div>
        <button onClick ="webgazer.pause()">Stop and Save</button> 
        <button onClick ="webgazer.resume()">Resume</button>
        <button onClick ={this.showTeacherView.bind(this)}>TeacherView</button>
        <ashton />
        
        <div><ul>
          <h3>Read the text below</h3>
          <li>her   fat   cat   sat   on  mat</li>
          <li>his   red   ted   is    on  the   bed</li>
          <li>my    car   can   go    far   to  mars</li>
          </ul></div>
      </WebGazeContext.Provider>
    
  }  
  </div>   
  );
  }
}
WebGazeLoader.contextType = WebGazeContext;
  
function App() {

  return (
    <div className="App">
      <WebGazeLoader />
    </div>
  );
}

export default App;