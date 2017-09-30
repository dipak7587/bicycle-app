import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class GoogleAutoComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = { }
        this.getLocation = this.getLocation.bind(this);
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        Promise.all([
            this.getLocation(this.state.source),
            this.getLocation(this.state.destination)
        ]).then(result => {
            this.props.getLocation(null,{
                source:result[0],
                destination:result[1]

            });
            return result;
        }).catch(error => {
            this.props.getLocation(error);
            throw  error;
        });
    }
    getLocation(location){
        return geocodeByAddress(location)
            .then(results => {
                return  results && results.length && getLatLng(results[0]);
            })

    }
    render() {

        return (
            <form onSubmit={this.handleFormSubmit}>
                <PlacesAutocomplete inputProps={{
                    value: this.state.source,
                    onChange: (source) => {
                        this.setState({source})
                    },
                }}/>
                <PlacesAutocomplete inputProps={{
                    value: this.state.destination,
                    onChange: (destination) => {
                        this.setState({destination})
                    },
                }}/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default GoogleAutoComplete