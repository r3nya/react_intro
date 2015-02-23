/** @jsx React.DOM */

var React = require('react'),
    people = [
        {
            'name' : 'Andrey M.',
            'subj' : 'React.js',
            'id'   : 0
        },
        {
            'name' : 'Nick P.',
            'subj' : 'ES6',
            'id'   : 1
        },
        {
            'name' : 'Dmitry F.',
            'subj' : 'Angular',
            'id'   : 2
        },
        {
            'name' : 'Nick K.',
            'subj' : 'Gulp',
            'id'   : '3'
        },
        {
            'name' : 'Dmitry R.',
            'subj' : 'ExtJS 5',
            'id'   : '4'
        },
        {
            'name' : 'Pavel Sh.',
            'subj' : 'Meteor.js',
            'id'   : '5'
        }
    ];

var Speaker = React.createClass({
    render: function () {
        return (
            <div className='skeaker'>
                <h2>{this.props.name}</h2>
                <h3>{this.props.subj}</h3>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            people: people
        };
    },
    render: function () {
        return (
            <div>
                {this.state.people.map(function (person) {
                    return (
                        <Speaker name={person.name} subj={person.subj} />
                    );
                })}
            </div>
        );
    }
});

React.render(<App />, document.body);
