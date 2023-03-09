import styles from './index.less';

export default function WelcomePage() {
  return (
    <div>
      <h1 className={styles.title}>Welcome</h1>

      <a href="http://localhost:8001/Login">Login</a> <br></br>
      <a href="http://localhost:8001/home">Text questions</a><br></br>
    </div>
  );
}
