import React,{Component} from 'react';
import Navigation from './component/navigation/Navigation';
import Logo from './component/Logo/Logo';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import Rank from './component/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';
import FaceRecogination from './component/FaceRecogination/FaceRecogination';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';

const app = new Clarifai.App({
  apiKey: '0d827ef200af47c59e87f206677d9a7d'
 });

const particlesOptions={
    particles: {
      number:{
        value:200,
        density:{
          enable:true,
          value_area:800
        }
      }
    }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn:false,
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }



  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) => {
    //this.setState({input: event.target.value});
    this.setState({input:event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err=>console.log(err));
  }


  onRouteChange = (route) => {
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }
    else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }
  


  render() {
    const {isSignedIn,route,imageUrl,box} = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn}
        onRouteChange={this.onRouteChange} />
        {route==='home' 

            ? <div>
            <Logo />
            <Rank/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecogination box={box} imageUrl={imageUrl} />
            </div>
             : (
               route==='signin'
               ?<Signin onRouteChange={this.onRouteChange}/>  
               :<Register onRouteChange={this.onRouteChange}/>
             )
    }
            </div>
          
    );
  }
}
export default App;
