import React from 'react';
import CohortDetails from './components/CohortDetails';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cohorts: [
                {
                    name: 'INTADMDF10 - .NET FSD',
                    startedOn: '22-Feb-2022',
                    status: 'Scheduled',
                    coach: 'Aathma',
                    trainer: 'Jojo Jose'
                },
                {
                    name: 'ADM21JF014 - Java FSD',
                    startedOn: '10-Sep-2021',
                    status: 'Ongoing',
                    coach: 'Apoorv',
                    trainer: 'Elisa Smith'
                },
                {
                    name: 'CDBJF21025 - Java FSD',
                    startedOn: '24-Dec-2021',
                    status: 'Ongoing',
                    coach: 'Aathma',
                    trainer: 'John Doe'
                }
            ]
        };
    }

    render() {
        return (
            <div className="App">
                <h1>Cohorts Details</h1>
                {this.state.cohorts.map((cohort, index) => (
                    <CohortDetails key={index} cohort={cohort} />
                ))}
            </div>
        );
    }
}

export default App;

