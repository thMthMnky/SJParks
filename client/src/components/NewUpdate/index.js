import React from 'react';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import EditMessage from './EditMessage';
import { parksDB } from '../../dummyDB';
import {Container} from './styles'

class NewUpdate extends React.Component {
  state = {
    parks: [],
    parkSelected: []
  };

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

  handleAddPark = park => {
    const { parkSelected } = this.state;
    const isSelected = parkSelected.find(el => el._id === park._id);

    if (!isSelected) this.setState({ parkSelected: [...parkSelected, park] });
  };

  handleAddAllPark = () => {
    this.setState({ parkSelected: [...this.state.parks] });
  };

  handleDeletePark = park => {
    this.setState({
      parkSelected: [
        ...this.state.parkSelected.filter(el => el._id !== park._id)
      ]
    });
  };

  handleDeleteAddAllPark = () => {
    this.setState({ parkSelected: [] });
  };

  render() {
    return (
      <>
        <Container>
          <SearchPark
            parks={this.state.parks}
            selected={false}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />
        </Container>
        <Container>
            <SelectedPark
              parks={this.state.parkSelected}
              deletePark={park => this.handleDeletePark(park)}
              deleteAllParks={this.handleDeleteAddAllPark}
            />
        </Container>
        <Container>
          <div className='col3'>
          {this.state.parkSelected.length === 0 ? (
              <p>Select parks you want to reach</p>
          ) : (
              <EditMessage titles={this.state.parkSelected.map(el => el.name)} />
          )}
          </div>
        </Container>
      </>
    );
  }
}

export default NewUpdate;
