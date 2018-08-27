import React, { Component } from 'react';
import {
  Button,
  Container,
  Icon,
  Menu,
  Header,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react';
import { Carousel } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const HomepageHeading = ({ mobile, content1, content2 }) => (
  <Container text>
    <Header
      as='h1'
      content='Together we can make a CHANGE'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='small effort, BIG change'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    {/*<Button primary size='huge'>
      Get Started
      <Icon name='right arrow' />
    </Button>*/}
  </Container>
);


class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item position='right' onClick={() => {browserHistory.push("/project")}}>
                    KERALA FLOOD RELIEF
                </Menu.Item>
              </Container>
            </Menu>
            <Carousel pauseOnHover={false}>
                <Carousel.Item animateIn={true}>
                  <img width={window.maxWidth} height={500} alt="900x500" src={require('./images/carousel1.jpg')} />
                  <Carousel.Caption>
                  <Header
                    as='h1'
                    content='Together we can make a CHANGE'
                    inverted
                    style={{
                      fontSize: '4em',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      marginTop: '3em',
                      //color: 'black',
                    }}
                    />
                    <Header
                      as='h2'
                      content='small effort, BIG IMPACT'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      //  color: 'black',
                      }}
                    />
                    <Header
                      as='h3'
                      content='vCharity'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      //  color: 'black',
                      }}
                    />
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item animateIn={true}>
                  <img width={window.maxWidth} height={500} alt="900x500" src={require('./images/carousel2.jpg')} />
                  <Carousel.Caption>
                  <Header
                    as='h1'
                    content='Together we can make a CHANGE'
                    inverted
                    style={{
                      fontSize: '4em',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      marginTop: '3em',
                      //color: 'black',
                    }}
                    />
                    <Header
                      as='h2'
                      content='small effort, BIG IMPACT'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      //  color: 'black',
                      }}
                    />
                    <Header
                      as='h3'
                      content='vCharity'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      //  color: 'black',
                      }}
                    />
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item animateIn={true}>
                  <img width={window.maxWidth} height={500} alt="900x500" src={require('./images/carousel3.jpg')} />
                  <Carousel.Caption>
                  <Header
                    as='h1'
                    content='Together we can make a CHANGE'
                    inverted
                    style={{
                      fontSize: '4em',
                      fontWeight: 'normal',
                      marginBottom: 0,
                      marginTop: '3em',
                    //  color: 'black',
                    }}
                    />
                    <Header
                      as='h2'
                      content='small effort, BIG IMPACT'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      //  color: 'black',
                      }}
                    />
                    <Header
                      as='h3'
                      content='vCharity'
                      inverted
                      style={{
                        fontSize: '1.7em',
                        fontWeight: 'normal',
                        marginTop: '1.5em',
                      //  color: 'black',
                      }}
                    />
                  </Carousel.Caption>
                </Carousel.Item>
           </Carousel>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
);

export default ResponsiveContainer;
