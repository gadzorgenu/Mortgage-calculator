import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createReactClass from 'create-react-class'

const calculatePayment = ( principal, rate,years) =>{
  let monthlyRate = rate / 100 /12;
  let monthlyPayment = principal *monthlyRate /( 1- Math.pow((1/ (1 + monthlyRate), years * 12)));
  let balance = principal;
  for( let x=0; x< years; x++){
    //interest payment for the year 
      let interestY = 0;
      //principal payment for the year
      let principalY = 0;
      for( let m=0; m< 12; m++){
        //interest for the month
        let interestM= balance * monthlyRate;
        //principal for the month
        let principalM = monthlyPayment - interestM;
        interestM += interestY;
        principalM += principalY;
        balance += principalM
      }
  }
  return {
    monthlyPayment: monthlyPayment
  }
}

const Header = createReactClass({
  render: ()=>{
    return (
      <header>
          <h1>{this.props.title}</h1>
      </header>
    )}
})

const MortgageCalculator = createReactClass({
  getInitialState: ()=>{
    return{
      principal: this.props.principal,
      years: this.props.years,
      rate: this.props.rate
    };
  },
  principalChange: (e)=>{
    this.setState({ principal: e.target.value})
  },
  yearChange: (e)=>{
    this.setState({ years: e.target.value})
  }, 
  rateChange: (e)=>{
    this.setState({ rate: e.target.value})
  },
  render: ()=>{
    let payment = calculatePayment(this.state.principal, this.state.years, this.state.rate);
    let monthlyPayment = payment.monthlyPayment;
    return(
      <div className='content'>
          <div className='form'>
              <div>
                <label>Principal: </label>
                <input type='text' 
                  value={this.state.principal}
                  onChange={this.principalChange}
                />
              </div>
              <div>
                <label>Years: </label>
                <input type='text' 
                  value={this.state.years}
                  onChange={this.yearChange}
                />
              </div>
              <div>
                <label>Rate: </label>
                <input type='text' 
                  value={this.state.rate}
                  onChange={this.rateChange}
                />
              </div>
          </div>
          <h2>Monthly Payment: <span className='currency'>
            {Number(monthlyPayment.toFixed(2)).toLocaleString()}
            </span></h2>
      </div>
    )
  }
})

const App = createReactClass({
  render: () =>{
    return(
      <div>
          <Header title='React Mortgage Calculator'/>
          <MortgageCalculator principal='200000' years='30' rate='5'/>
      </div>
    )
  }
})

ReactDOM.render(<App />,document.getElementById('root'));

