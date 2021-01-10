import React from 'react';
import { WebGazeContext } from './webgazecontext';
//import UsableButton from './components/Buttons';
import axios from 'axios';


//import './Main.css';

class ashton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }

    this.regularCount = this.regularCount.bind(this);
  }

  /* */
  regularCount() {
    const active = this.doChecks();
    const newData = this.state.data.map(
      (b) => {
        let res = b;
        if (b.uid === active) {
          res.count += 5;
          if (res.count >= 100) {
            // reset and trigger action
            res.count = 0;
            axios.get(`https://maker.ifttt.com/trigger/${b.action}/with/key/${process.env.REACT_APP_IFTTT_KEY}`)
              .then(res => {
                console.log(res);
              });

          }
        } else {
          res.count -= 2.5;
          if (res.count < 0) {
            res.count = 0;
          }
        }
        return res;
      }
    );

    this.setState({data: newData});
  }

  /* Remove the interval */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    /* Fetch a list of all the state */
    axios.get(process.env.REACT_APP_CONFIG)
      .then(res => {
        this.setState({data: res.data});
      });
    this.interval = setInterval(
      () => {
        this.regularCount();
      },
      250
    );
  }


  doChecks() {
    if (this.context === undefined) {
      return -1;
    }
    /* Loop through until we find an element that we have setup our selves */
    const tags = document.elementsFromPoint(this.context.x, this.context.y);
    for (let i = 0; i < tags.length; i++) {
      const element = tags[i];
      if (element.className === process.env.REACT_APP_CLASS_NAME) {
        return element.getAttribute('uid') || -1;
      }

    }
    return -1;
  }

  
  render() {
    const active = this.doChecks();
    /* Generate a list of all the buttons */
    // const VisableButtons = this.state.data.map(
    //   (b) => (
    //     <UsableButton
    //       name={b.name}
    //       uid={b.uid}
    //       active={active}
    //       count={b.count}
    //     />)
    // );
    return (
      <div id="container">
       <h1>HippoCampus</h1>
        <h2>Welcome to eye-tracking based rapid reading assesment!</h2> 
        <div>
Url:<input type="text" id="url" name="name" required size="50"  defaultvalue = {"https://www.google.com"}   />
<button   onclick="Navigate();"  type="button" >Go</button>
<button   onclick="PlayRec()"  type="button" >Finished Reading, Save!</button>
<button>Teacher View</button>
</div>
        <ul><li>
        FAT CAT SAT ON MAT
          </li>FAT CAT SAT ON MAT</ul
          >
        <WebGazeContext.Consumer>
          {value => (<div>{value.x} {value.y}</div>)}
        </WebGazeContext.Consumer>
        {/* {VisableButtons} */}
        </div>
    );
  }
}
ashton.contextType = WebGazeContext;

export default ashton;