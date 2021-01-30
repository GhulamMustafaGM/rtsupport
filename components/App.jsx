import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      channels: [],
      users: [],
      activeChannel: {},
      connected: false
    };
  }
  componentDidMount() {
    let ws = this.ws = new WebSocket('ws://echo.websocket.org');
  }


  newChannel(channel) {
    let {channels} = this.state;
    channels.push(channel);
    this.setState({channels});
  }
  addChannel(name){
    let {channels} = this.state;
    // channels.push({id: channels.length, name});
    // this.setState({channels});
    // TODO: Send to server
    let msg = {
      name: 'channel add',
      data: {
        id: channels.length,
        name
      }
    }
    this.ws.send(JSON.stringify(msg))
  }
  setChannel(activeChannel){
    this.setState({activeChannel});
    // TODO: Get Channels Messages
  }
  render(){
    return (
      <div className='app'>
        <div className='nav'>
          <ChannelSection 
            {...this.state}
            addChannel={this.addChannel.bind(this)}
            setChannel={this.setChannel.bind(this)}
          />
        </div>
      </div>

      
    )
  }
}

export default App