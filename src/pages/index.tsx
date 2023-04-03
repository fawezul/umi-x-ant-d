import styles from './index.less';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Text from './home/text';

export default function WelcomePage() {
  return (
    <div>
      <h1 className={styles.title}>Welcome</h1>

      <a href="http://localhost:8001/Login">Login</a> <br></br>
      <a href="http://localhost:8001/home">Speech Version</a><br></br>
      <Router>
      <Link to="/text">Text Version</Link>

      <Switch>
        <Route path="/text" component={Text} />
        <Route path="/" exact>
          <p>Welcome to the homepage!</p>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}
