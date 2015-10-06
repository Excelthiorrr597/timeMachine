// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')

let React = require('react'),
	$ = require('jquery')

// other stuff that we don't really use in our own code
// var Pace = require("../bower_components/pace/pace.js")

// require your own libraries, too!
// var Router = require('./app.js')

// window.addEventListener('load', app)

// function app() {
    // start app
    // new Router()
// }
window.onload = function() {
	var audio = new Audio('timeWarp.wav')

	audio.play()
}

var ClockComponent = React.createClass({

	getInitialState: function(){
		 return {
		 	year:2015,
		 	ticking: false,
		 	direction: ''
		 }
	},

	handleBackwardClick: function(){
		if (this.state.ticking === true) {
			this.stopBackwardTime()
		}
		else this.travelBackward()
	},

	handleForwardClick: function(){
		if (this.state.ticking === true) {
			this.stopForwardTime()
		}
		else this.travelForward()
	},

	start: 1000,
	
	travelBackward: function(){
		this.setState({year: this.state.year - 1, ticking: true, direction: 'back'})
		this.interval = setTimeout(this.travelBackward, this.start/=1.1)
	},

	travelForward: function(){
		this.setState({year: this.state.year + 1, ticking: true, direction: 'front'})
		this.interval = setTimeout(this.travelForward, this.start/=1.1)
	},

	stopBackwardTime: function(){
		window.clearTimeout(this.interval)

		this.setState({year: this.state.year - 1, ticking: false, direction: ''})
		if (this.start < 500) {
			this.stop = setTimeout(this.stopBackwardTime, this.start*=1.1)
		}
		else {
			window.clearTimeout(this.stop)
			this.start = 1000
		}
	},

	stopForwardTime: function(){
		window.clearTimeout(this.interval)

		this.setState({year: this.state.year + 1, ticking: false, direction: ''})
		if (this.start < 500) {
			this.stop = setTimeout(this.stopForwardTime, this.start*=1.1)
		}
		else {
			window.clearTimeout(this.stop)
			this.start = 1000
		}
	},

	stopTime: function(){
		if (this.state.direction === '') return
		else if (this.state.direction === 'back') this.stopBackwardTime()
		else this.stopForwardTime()
	},

	render: function(){
		return(<div>
			<p> The year is: <span className="readout">{this.state.year}</span></p>
			<button	onClick={this.handleForwardClick} className="tickYearButton">Forward</button>
			<button onClick={this.stopTime} className="tickYearButton">Stop</button>
			<button	onClick={this.handleBackwardClick} className="tickYearButton">Backward</button>
			</div>
			)
	}
})

React.render(<ClockComponent/>,document.getElementById("readoutContainer"))
