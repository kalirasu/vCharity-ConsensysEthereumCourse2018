import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment,} from 'semantic-ui-react';
import { Carousel, Navbar,Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
        bcstoreProjectDetailRetrieved,
      } from '../actions';

import { ResponsiveContainer } from '../components/ResponsiveContainer';

class HomePage extends Component {
  imageClick = () => {
    console.log('image clicked');
    browserHistory.push("/project");
  }

  headerClick = () => {
    console.log('header clicked');
    browserHistory.push('/home');
  }
  render() {
    return (
     <div className='HomePage'>
       <ResponsiveContainer>
         <Header
           as='h1'
           content='Crystalline Appeals'
           inverted
           style={{
             fontSize: '3em',
             fontWeight: 'bold',
             marginTop: '1.5em',
             paddingLeft: '13em',
             color: 'black',
             justifyContent: 'center',
             textAlign: 'left',
           }}
         />
         <Segment style={{ padding: '8em 0em' }} vertical>
         <Grid centered container columns={2}>
          <Grid.Column>
            <Image src={require('./images/kerala_flood.jpg')} onClick={this.imageClick.bind(this)}/>
            <Header
              as='h2'
              content='FLOOD RELIEF'
              onClick={this.headerClick.bind(this)}
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'bold',
                color: '#13547a',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <Header
              as='h3'
              content='Kerala Flood Relief camp, 2018 - Kerala, India'
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'bold',
                color: 'grey',
                justifyContent: 'left',
                //alignItems: 'center',
              }}
            />
          </Grid.Column>
        </Grid>
         </Segment>
       </ResponsiveContainer>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { projectDetail
  } = state.homePage;
  return { projectDetail
         };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    bcstoreProjectDetailRetrieved,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
