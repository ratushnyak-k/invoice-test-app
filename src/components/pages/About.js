import React from 'react'
import {
  Divider,
  List,
  ListItem,
} from 'material-ui'

const About = () => {
  const links = [
    {
      link: 'https://ninjamock.com/s/2DXTFWx',
      text: 'Link to created wireframes',
    },
    {
      link: 'https://github.com/ratushnyak-k/invoice-test-app',
      text: 'Link to github',
    },
  ]
  const usedTechnologies = [
    'Create React App, custom react scripts, yarn',
    'Heroku for deploy and hosting',
    'MobX architecture',
    'React Router',
    'Axios for REST',
    'Material UI',
    'Stylus',
  ]

  return (
    <div>
      <h4>Useful Links:</h4>
      <List>
        {
          links.map((item) => {
            return <ListItem
              key={item.link}
            >
              <a href={item.link}>{item.text}</a>
            </ListItem>
          })
        }
      </List>
      <Divider style={{marginBottom: '30px'}} />
      <h4>Used technologies:</h4>
      <List>
        {
          usedTechnologies.map((item, i) => {
            return <ListItem
              key={item}
              primaryText={`${i + 1}. ${item}`}
            />
          })
        }
      </List>
    </div>
  )
}


export default About