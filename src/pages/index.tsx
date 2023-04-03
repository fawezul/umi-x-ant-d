import styles from './index.less';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Text from './home/text';

export default function WelcomePage() {
  return (
    

    <div>
      <p className={styles.title}>Welcome to Chatbot ╚═། ◑ ▃ ◑ །═╝</p>

      <Link to="/home" className={styles.buttonText}>Speech Version</Link>
      
      <Router>
      <Link  to="/text" className={styles.button}>Text Version</Link>
      <Switch>
        <Route path="/text" component={Text} />
        <Route path="/" exact>
          <p></p>
        </Route>
      </Switch>
    </Router>
    </div>
    
  )};
 
