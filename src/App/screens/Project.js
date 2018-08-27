import React, { Component } from 'react';
import {
  Button,
  Container,
  Icon,
  Menu,
  Header,
  Responsive,
  Segment,
  Grid,
  Visibility,
  Step,
  Statistic,
  Form,
} from 'semantic-ui-react';
//import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import {
        lbcstoreProjectDetailRetrieved,
        ipfsretrieved,
      } from '../actions';
//import { bindActionCreators } from 'redux';
import { hex2ascii } from '../config/hex2ascii';
import configurevlinderContract from '../config/vlinderContract';
import  { web3 }  from '../config/uportSetup';

const vlinderContract = configurevlinderContract(web3);

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
console.log('Taking a break...');
await sleep(8000);
console.log('Two second later');
}

var IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

var Input = require('./config/input.json');

import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class ResponsiveContainer extends Component  {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  donorClick = (projectRetrived) => {
    //  console.log('Accounts :', accounts);
      //var accounts_l = accounts;
      vlinderContract.registerDonation(15000, (err, res) => {
        if(res) {
          vlinderContract.getProject.call((err, res) => {
               console.log('Project full detail : ', res);
               res[5] = res[5].toNumber();
               res[6] = res[6].toNumber();
               res[9] = res[9].toNumber();
               res[4] = hex2ascii(res[4]);
               demo();
               projectRetrived(res);

             const interval = setInterval(() => {
                web3.eth.getTransactionReceipt(res, (errorx, response) => {
                  if (errorx) {
                    clearInterval(interval);
                    //alert('Tx Failed');
                  }
                  if (response) {
                    clearInterval(interval);
                    console.log(response);
                    console.log('response Status: ', response.status);
                    if (response.status === '0x0') {
                    //  alert('Tx Failed');
                     }
                    else {
                      alert('Tx Succeeded');
                    }
                  }
                });
              }, 1000);
           })
        }
      });
  }
  render() {
    const { children, projectDetail, projectRetrived } = this.props;
    const { fixed } = this.state;
    return (
  <div>
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
          <Header size='huge' inverted as='h1' icon textAlign='center'>
            <Icon color='green' name='envira gallery' />
            <Header.Content>vCharity</Header.Content>
          </Header>
          </Container>
        </Menu>
        <Container>
        <Grid columns={2} divided>
        <Grid.Column>
          <Segment inverted raised padded>
              <Header size='huge' inverted as='h1' textAlign='left'>
                <Header.Content>2018 Kerala floods, India</Header.Content>
              </Header>
              <Header size='huge' inverted as='h2' textAlign='left' style={{ color: 'grey' }}>
                <Header.Content>In late July 2018, severe flooding affected the Indian state of Kerala due to unusually high rainfall during the monsoon season. It was the worst flooding in Kerala in nearly a century.Over 445 people died, 15 are missing within a fortnight, while at least 280,679 people were evacuated, mainly from Chengannur, Pandanad, Aranmula, Aluva, Chalakudy, Kuttanad and Pandalam. All 14 districts of the state were placed on high alert. According to the Kerala government, one-sixth of the total population of Kerala had been directly affected by the floods and related incidents.The Union government had declared it a Level 3 Calamity or Calamity of a severe nature</Header.Content>
              </Header>
              <Header size='huge' inverted as='h2' textAlign='left' style={{ color: 'grey' }}>
                <Header.Content>Thirty-five out of the forty-two dams within the state were opened for the first time in history.</Header.Content>
              </Header>
              <Header size='huge' inverted as='h2' textAlign='left' >
                <Header.Content>vCharity, a platform to enable transparent charity</Header.Content>
              </Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic>
          <CircularProgressbar
            percentage={projectDetail[5]/projectDetail[6]}
            initialAnimation={true}
            text={`${projectDetail[5]/projectDetail[6]}% raised`}
            styles={{
              root: { height: '350px', width: '350px' },
              path: { stroke: 'green' },
              text: { fill: 'white', fontSize: '8px' },
            }}
          />
          </Segment>
          <Segment basic>
            <Button inverted color='green' size='massive' onClick={this.donorClick.bind(this, projectRetrived)}>Donate</Button>
          </Segment>
            <Statistic color='green' inverted size='huge'>
              <Statistic.Value><Icon name='like' color='red'/>{projectDetail[9]}</Statistic.Value>
              <Statistic.Label>Donors already funded</Statistic.Label>
            </Statistic>
        </Grid.Column>
         </Grid>
          {/*<Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
          </Button>*/}
          <Step.Group size='small' inverted>
              <Step
                active={projectDetail[6] !== 0}
                completed={projectDetail[6] !== 0}
                icon='road'
                title='Charity sets Goal'
                description={`Charity ID: ${projectDetail[2]}`}
                inverted
              />
              <Step
                active={projectDetail[7] !== 1}
                completed={projectDetail[7] !== 1}
                icon='handshake'
                title='You Donate'
                inverted
              />
              <Step
                active={projectDetail[7] === 1}
                completed={projectDetail[7] === 1}
                icon='like'
                title='Charity completes Goal'
                description={`Charity ID: ${projectDetail[2]}`}
                inverted
              />
              <Step
                active={projectDetail[8] === 1}
                completed={projectDetail[8] === 1}
                icon='flag checkered'
                title='Validator confirms goals'
                description={`Validator ID: ${projectDetail[1]}`}
                inverted
              />
              <Step
                active={projectDetail[8] === 1}
                completed={projectDetail[8] === 1}
                icon='money'
                title='Charity receives donations'
                description={`Charity ID: ${projectDetail[2]}`}
                inverted
              />
         </Step.Group>

        </Container>
      </Segment>
    </Visibility>
    {children}
  </Responsive>
  </div>
);
}
};

class Project extends Component {
  componentWillMount() {
    // let accounts_l;
      console.log('Get Accounts');

        var ipfsJSON = JSON.stringify(Input);
          ipfs.add(ipfsJSON, (ipfsDirError, ipfsDirHash) => {
            if(ipfsDirHash) {
              console.log('IPFS Hash retrieved :', ipfsDirHash);
            }
          });
    vlinderContract.getProject.call((err, res) => {
          if(res) {
            console.log('Project full detail : ', res);
            res[5] = res[5].toNumber();
            res[6] = res[6].toNumber();
            res[9] = res[9].toNumber();
            res[4] = hex2ascii(res[4]);
            this.props.lbcstoreProjectDetailRetrieved(res);
          }
        })
  }
  getIPFS(pd) {
    let url = 'https://ipfs.infura.io/ipfs/' + pd[4];
    url = encodeURI(url);
    axios.get(url)
    .then((response) => {
      this.props.ipfsretrieved(response.data);
    })
  }
  render() {
    return (
        <ResponsiveContainer projectDetail={this.props.projectDetail} projectRetrived={this.props.lbcstoreProjectDetailRetrieved}>
          <Segment style={{ padding: '8em 0em' }} vertical>
          {this.getIPFS(this.props.projectDetail)}
          <Form size='massive' style={{ paddingLeft: '10em', paddingRight: '10em' }}>
            <Form.Field>
              <label>Project</label>
              <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.projectName : 'KERALA FLOOD RELIEF' } />
            </Form.Field>
            <Form.Field>
              <label>Summary</label>
              <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.summary : 'The Government of Kerala started a donation website for flood victims. As of 27 August 2018, ₹674 crore (US$98 million) was collected from the public.Prime Minister of India, Narendra Modi announced a sum of ₹500 crore (US$73 million) as interim relief for Kerala on 18 August 2018. This is in addition to ₹100 crore (US$15 million) announced by the Home Minister on 12 August 2018.The central government also said in its press release that this ₹600 crore (US$87 million) is only the advance assistance and that additional funds will be released by the NDRF when an inter-ministerial team visits again and assesses the damage.European Union has announced an assistance of ₹1.53 crore (US$220,000) in aid funding to the Indian Red Cross Society for providing relief to flood-affected people in Kerala'} />
            </Form.Field>
            <Form.Field>
            <label>Project Goals</label>
            <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.projectGoals : 10000000 } />
            </Form.Field>
            <Form.Field>
            <label>who Runs</label>
            <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.whoRuns : 'vCharity'} />
            </Form.Field>
            <Form.Field>
            <label>Who Valdiates</label>
            <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.whoValidates : 'KERELA GOVERNMENT'} />
            </Form.Field>
            <Form.Field>
            <label>Who We Are Helping</label>
            <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.whoWeAreHelping : 'Kerala victimised family members and Kerala Government for Recovery'} />
            </Form.Field>
            <Form.Field>
            <label>Where your Money will go ?</label>
            <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.whereYourMoneywillGo : 'Transparent Tracking will let you know the exact consumption of YOUR valuable donation' } />
            </Form.Field>
            <Form.Field>
            <label>Who V R ?</label>
            <input placeholder={this.props.ipfsdata ? this.props.ipfsdata.whoVR : 'vCharity - platform, TOGETHER we can make a CHANGE, small effort, BIG IMPACT'} />
            </Form.Field>
          </Form>
          </Segment>
        </ResponsiveContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { projectDetail, ipfsdata,
  } = state.project;
  return { projectDetail, ipfsdata,
         };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    lbcstoreProjectDetailRetrieved,
    ipfsretrieved,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
