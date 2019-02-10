import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
    {name: 'Jun', uv: 3000, pv: 2400, amt: 2400},
    {name: 'Jul', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Aug', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Sept', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Oct', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Nov', uv: 2390, pv: 3800, amt: 2500},
];

export default class Graph extends Component {
    state = {}
    componentDidMount() {
        if(window.innerWidth <= 768){
            this.setState(
                {
                    width:  document.body.clientWidth-20,
                    height: 0.5*window.innerWidth
                }
            )
        }
    }

    render(){
        let mobileWidth = document.getElementById("graph");
        return (
            <div id="graph">
                <LineChart width={this.state.width || window.innerWidth*0.30} height={this.state.height || window.innerWidth*0.18} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#004A75" />
                    <CartesianGrid stroke="#ddd" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </div>
        )
    }
}