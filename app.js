
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            perPage : 5,
            currentPage : 1,
            horizontalColumn : 3,
            horizontalCurrentStart : 0,
            data : [],
            columns : []
        };
        fetch('/data.json').then(response => response.json())
        .then(data => {
            this.setState({
                data : data,
            }, ()=>{
                this.setState({
                    columns : Object.keys(this.state.data[0])
                })
            })
        });


        this.handleLeft = this.handleLeft.bind(this);
        this.handleRight = this.handleRight.bind(this);
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
    }

    handleLeft(){
        if(this.state.horizontalCurrentStart>0){
            this.setState({horizontalCurrentStart : this.state.horizontalCurrentStart-1})
        }
    }
    handleRight() {
        if (this.state.horizontalCurrentStart < this.state.columns.length - this.state.horizontalColumn) {
            this.setState({ horizontalCurrentStart: this.state.horizontalCurrentStart + 1 })
        }
    }
    handleDown() {
        if (this.state.currentPage < this.state.data.length - this.state.perPage) {
            this.setState({ currentPage: this.state.currentPage + 1 })
        }
    }
    handleUp() {
        if (this.state.currentPage > 0) {
            this.setState({ currentPage: this.state.currentPage - 1 })
        }
    }
    
    render(){
      
        return (
            <div>
         <table>
             <thead>
                    <tr>
                       
                        {this.state.columns.slice(this.state.horizontalCurrentStart, this.state.horizontalColumn + this.state.horizontalCurrentStart).map(column => {

                            return (
                                <th>
                                    {column}
                                </th>
                            )
                        })}
                    </tr>
             </thead>
             <tbody>
                 {this.state.data.slice(this.state.currentPage-1,this.state.perPage+this.state.currentPage).map(item =>{
                     return (<tr>
                            {Object.values(item).slice(this.state.horizontalCurrentStart,this.state.horizontalColumn+this.state.horizontalCurrentStart).map(column =>{
                            
                                    return(
                                        <td>
                                            {column}
                                        </td>
                                    )
                                })}
                            </tr>)
                 })}
             </tbody>
         </table>

                 <div>
                     <button onClick={this.handleLeft}>sol</button>
                    <button onClick={this.handleRight}>sağ</button>
                    <button onClick={this.handleDown}>aşağı</button>
                    <button onClick={this.handleUp}>yukarı</button>

                 </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />
    , document.getElementById('app'))


// {
//     this.Row().length > 0 ?
//     this.Row().map(item => {
//         return (<tr>
//             {this.Column(item).map(row => {
//                 return (<td>{row}</td>)
//             })}
//         </tr>)
//     })
//     : ''
// }